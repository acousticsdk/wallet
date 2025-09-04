import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { BankIcon, CryptoIcon } from '../components/ui/Icons';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let WALLET_BALANCE = 900;
let WALLET_FROZEN = 550;
let WALLET_MONTHLY_EXPENSES = 1800;
let WALLET_TOTAL_EXPENSES = 5200;
let WALLET_TEAM_MEMBERS = [];
let WALLET_RECENT_TRANSACTIONS = [];
let WALLET_TEAM_START_INDEX = 0;

// Моковые данные команды
const MOCK_TEAM = [
  {
    id: 1,
    name: 'Ivan Astah',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'Maria Kozlova',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'Dmitry Petrov',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 4,
    name: 'Anna Sidorova',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 5,
    name: 'Alex Volkov',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 6,
    name: 'Elena Vasilieva',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

// Моковые данные транзакций
const MOCK_TRANSACTIONS = [
  {
    id: 1,
    name: 'Дмитрий',
    specialization: 'Видеограф',
    time: 'Сегодня, 14:30',
    amount: -400,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'Артем',
    specialization: 'Дизайнер',
    time: 'Сегодня, 16:00',
    amount: -120,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'Екатерина',
    specialization: 'Монтажер',
    time: 'Сегодня, 12:50',
    amount: -200,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export default function WalletScreen() {
  const [balance] = useState(WALLET_BALANCE);
  const [frozen] = useState(WALLET_FROZEN);
  const [monthlyExpenses] = useState(WALLET_MONTHLY_EXPENSES);
  const [totalExpenses] = useState(WALLET_TOTAL_EXPENSES);
  const [teamMembers] = useState(MOCK_TEAM);
  const [transactions] = useState(MOCK_TRANSACTIONS);
  const [teamStartIndex, setTeamStartIndex] = useState(0);

  const handleBankWithdraw = () => {
    // TODO: Логика вывода на банк
    console.log('Вывод на банк');
  };

  const handleCryptoWithdraw = () => {
    // TODO: Логика вывода на крипту
    console.log('Вывод на крипту');
  };

  const handleViewMoreTeam = () => {
    // TODO: Показать всю команду
    console.log('Показать всю команду');
  };

  const handleTeamPrevious = () => {
    if (teamStartIndex > 0) {
      const newIndex = teamStartIndex - 1;
      setTeamStartIndex(newIndex);
      WALLET_TEAM_START_INDEX = newIndex;
    }
  };

  const handleTeamNext = () => {
    if (teamStartIndex + 3 < teamMembers.length) {
      const newIndex = teamStartIndex + 1;
      setTeamStartIndex(newIndex);
      WALLET_TEAM_START_INDEX = newIndex;
    }
  };

  const getVisibleTeamMembers = () => {
    return teamMembers.slice(teamStartIndex, teamStartIndex + 3);
  };

  const renderTeamMember = ({ item, index }) => (
    <View key={item.id} style={styles.teamMemberWrapper}>
      <View style={styles.teamMember}>
        <Image source={{ uri: item.avatar }} style={styles.teamAvatar} />
        <Text style={styles.teamName}>{item.name}</Text>
      </View>
    </View>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={styles.transactionAvatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.transactionAvatar} />
          <View style={styles.transactionIndicator} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionName}>
            {item.name} ({item.specialization})
          </Text>
          <Text style={styles.transactionTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}$</Text>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://alfacta.online/100k/main-bg.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>КОШЕЛЕК</Text>
            </View>
          </View>

          {/* Main Balance */}
          <View style={styles.balanceContainer}>
            <View style={styles.gradientTextContainer}>
              <Svg height="80" width="300">
                <Defs>
                  <SvgLinearGradient id="balanceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#FFFFFF" />
                    <Stop offset="100%" stopColor="#28CEFF" />
                  </SvgLinearGradient>
                </Defs>
                <SvgText
                  fill="url(#balanceGrad)"
                  fontSize="72"
                  fontWeight="700"
                  x="150"
                  y="55"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Codec-Pro-Bold"
                >
                  900$
                </SvgText>
              </Svg>
            </View>
            <Text style={styles.balanceSubtitle}>Расходы за 30 дней</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Заморожено</Text>
              <Text style={styles.statValue}>{frozen}$</Text>
            </View>
            
            <View style={styles.statItemCenter}>
              <Text style={styles.statValueCenter}>{monthlyExpenses.toLocaleString()}$</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Все расходы</Text>
              <Text style={styles.statValue}>{totalExpenses.toLocaleString()}$</Text>
            </View>
          </View>

          {/* Withdrawal Methods */}
          <View style={styles.withdrawalContainer}>
            <TouchableOpacity style={styles.withdrawalMethod} onPress={handleBankWithdraw}>
              <View style={styles.withdrawalIcon}>
                <BankIcon size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.withdrawalText}>БАНК</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.withdrawalMethod} onPress={handleCryptoWithdraw}>
              <View style={styles.withdrawalIcon}>
                <CryptoIcon size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.withdrawalText}>КРИПТА</Text>
            </TouchableOpacity>
          </View>

          {/* Team Section */}
          <View style={styles.teamSection}>
            <View style={styles.teamHeader}>
              <Text style={styles.teamTitle}>Команда</Text>
              <TouchableOpacity onPress={handleViewMoreTeam}>
                <Text style={styles.teamMore}>Еще..</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.teamScrollContainer}>
              <TouchableOpacity 
                style={[
                  styles.teamNavButton,
                  teamStartIndex === 0 && styles.teamNavButtonDisabled
                ]}
                onPress={handleTeamPrevious}
                disabled={teamStartIndex === 0}
              >
                <ChevronLeft size={20} color="#666666" />
              </TouchableOpacity>
              
              <View style={styles.teamScrollView}>
                {getVisibleTeamMembers().map((item, index) => (
                  <View key={item.id} style={styles.teamMemberWrapper}>
                    {renderTeamMember({ item, index })}
                  </View>
                ))}
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.teamNavButton,
                  teamStartIndex + 3 >= teamMembers.length && styles.teamNavButtonDisabled
                ]}
                onPress={handleTeamNext}
                disabled={teamStartIndex + 3 >= teamMembers.length}
              >
                <ChevronRight size={20} color="#666666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.transactionsSection}>
            <Text style={styles.transactionsTitle}>Последние операции</Text>
            
            <View style={styles.transactionsList}>
              {transactions.map((item) => (
                <View key={item.id}>
                  {renderTransaction({ item })}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#070707',
  },
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gradientTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  balanceSubtitle: {
    color: '#787878',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 40,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  statItemCenter: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  statLabel: {
    color: '#787878',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  statValueCenter: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  withdrawalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 50,
  },
  withdrawalMethod: {
    alignItems: 'center',
    gap: 12,
  },
  withdrawalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  withdrawalText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
  teamSection: {
    marginBottom: 40,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  teamTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  teamMore: {
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  teamScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamNavButton: {
    paddingHorizontal: 24,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamNavButtonDisabled: {
    opacity: 0.3,
  },
  teamScrollView: {
    flex: 1,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamMemberWrapper: {
    width: 80,
  },
  teamMember: {
    alignItems: 'center',
    gap: 12,
  },
  teamAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#333333',
  },
  teamName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  transactionsSection: {
    paddingHorizontal: 24,
  },
  transactionsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionAvatarContainer: {
    position: 'relative',
  },
  transactionAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  transactionIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0066FF',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  transactionName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 4,
  },
  transactionTime: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-News',
  },
  transactionAmount: {
    color: '#EF4444',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  bottomSpacing: {
    height: 120,
  },
});