import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { ChevronUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height: screenHeight } = Dimensions.get('window');

export default function BankModal({ visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const [selectedCurrency, setSelectedCurrency] = React.useState('EURO');

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100 || gestureState.vy > 0.5) {
        onClose();
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const currencies = ['EURO', 'PLN', 'USD'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [
                    { translateY: slideAnim },
                    { translateY: panY },
                  ],
                },
              ]}
              {...panResponder.panHandlers}
            >
              {/* Handle */}
              <View style={styles.handle} />

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerTitle}>
                  <Text style={styles.headerText}>КОШЕЛЕК</Text>
                </View>
              </View>

              {/* Content */}
              <View style={styles.content}>
                <Text style={styles.sectionTitle}>БАНК</Text>

                {/* Currency Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Валюта</Text>
                  
                  <View style={styles.currencySelector}>
                    <View style={styles.currencyDisplay}>
                      <Text style={styles.selectedCurrency}>{selectedCurrency}</Text>
                      <ChevronUp size={20} color="#666666" />
                    </View>
                  </View>

                  <View style={styles.currencyOptions}>
                    {currencies.map((currency) => (
                      <TouchableOpacity
                        key={currency}
                        style={[
                          styles.currencyOption,
                          selectedCurrency === currency && styles.currencyOptionSelected
                        ]}
                        onPress={() => setSelectedCurrency(currency)}
                      >
                        <Text style={[
                          styles.currencyOptionText,
                          selectedCurrency === currency && styles.currencyOptionTextSelected
                        ]}>
                          {currency}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Amount Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Сумма</Text>
                  
                  <LinearGradient
                    colors={['#4F46E5', '#06B6D4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.amountInput}
                  >
                    <Text style={styles.amountText}>900$</Text>
                  </LinearGradient>
                </View>

                {/* Continue Button */}
                <LinearGradient
                  colors={['#4F46E5', '#06B6D4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.continueButton}
                >
                  <TouchableOpacity style={styles.continueButtonInner} onPress={onClose}>
                    <Text style={styles.continueButtonText}>ПРОДОЛЖИТЬ</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: screenHeight * 0.7,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 16,
  },
  currencySelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 16,
  },
  currencyDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  selectedCurrency: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  currencyOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  currencyOption: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  currencyOptionSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  currencyOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  currencyOptionTextSelected: {
    color: '#FFFFFF',
  },
  amountInput: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Codec-Pro-Bold',
  },
  continueButton: {
    borderRadius: 20,
    marginTop: 40,
  },
  continueButtonInner: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    letterSpacing: 1,
  },
});