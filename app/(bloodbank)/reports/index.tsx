import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { Colors, Spacing, Typography, Shadows } from '../../../src/theme';
import { Card } from '../../../src/components/Card';

const screenWidth = Dimensions.get('window').width;

// Mock data for charts
const donationData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 35, 28, 45, 38, 52],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['Monthly Donations'],
};

const bloodTypeData = [
  { name: 'A+', population: 12, color: '#3B82F6', legendFontColor: Colors.text.primary, legendFontSize: 12 },
  { name: 'A-', population: 5, color: '#60A5FA', legendFontColor: Colors.text.primary, legendFontSize: 12 },
  { name: 'B+', population: 8, color: '#EF4444', legendFontColor: Colors.text.primary, legendFontSize: 12 },
  { name: 'B-', population: 3, color: '#F87171', legendFontColor: Colors.text.primary, legendFontSize: 12 },
  { name: 'O+', population: 15, color: '#10B981', legendFontColor: Colors.text.primary, legendFontSize: 12 },
  { name: 'O-', population: 2, color: '#34D399', legendFontColor: Colors.text.primary, legendFontSize: 12 },
  { name: 'AB+', population: 4, color: '#8B5CF6', legendFontColor: Colors.text.primary, legendFontSize: 12 },
  { name: 'AB-', population: 1, color: '#A78BFA', legendFontColor: Colors.text.primary, legendFontSize: 12 },
];

const requestStatusData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [15, 22, 18, 25, 30, 28],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      name: 'Approved',
    },
    {
      data: [5, 8, 6, 10, 12, 15],
      color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
      name: 'Rejected',
    },
  ],
  legend: ['Approved', 'Rejected'],
};

const chartConfig = {
  backgroundColor: Colors.primary,
  backgroundGradientFrom: Colors.white,
  backgroundGradientTo: Colors.white,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(75, 85, 99, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: Colors.primary,
  },
  propsForLabels: {
    fontSize: 10,
  },
};

const timeRanges = [
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' },
  { label: 'Last 3 Months', value: '3months' },
  { label: 'Last 6 Months', value: '6months' },
  { label: 'This Year', value: 'year' },
];

const reportTypes = [
  { id: 'donations', label: 'Donations', icon: 'water' },
  { id: 'requests', label: 'Requests', icon: 'list' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory' },
  { id: 'donors', label: 'Donors', icon: 'people' },
];

export default function ReportsScreen() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('30days');
  const [activeReport, setActiveReport] = useState('donations');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert(
        'Report Generated',
        'Your report has been generated and is ready to download.',
        [
          { 
            text: 'Download', 
            onPress: () => console.log('Downloading report...') 
          },
          { 
            text: 'Close', 
            style: 'cancel' 
          },
        ]
      );
    }, 1500);
  };

  const renderReportContent = () => {
    switch (activeReport) {
      case 'donations':
        return (
          <View>
            <Text style={styles.sectionTitle}>Monthly Donation Trends</Text>
            <LineChart
              data={donationData}
              width={screenWidth - Spacing.xl * 2}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withShadow={false}
              withVerticalLines={false}
              withHorizontalLines={false}
            />
            
            <Text style={[styles.sectionTitle, { marginTop: Spacing.xl }]}>Donation by Blood Type</Text>
            <PieChart
              data={bloodTypeData}
              width={screenWidth - Spacing.xl * 2}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chart}
            />
          </View>
        );
        
      case 'requests':
        return (
          <View>
            <Text style={styles.sectionTitle}>Request Status Over Time</Text>
            <BarChart
              data={requestStatusData}
              width={screenWidth - Spacing.xl * 2}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
              withInnerLines={false}
              withOuterLines={false}
              withShadow={false}
              withVerticalLines={false}
              withHorizontalLines={false}
            />
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>42</Text>
                <Text style={styles.statLabel}>Total Requests</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: Colors.success }]}>28</Text>
                <Text style={styles.statLabel}>Approved</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: Colors.error }]}>8</Text>
                <Text style={styles.statLabel}>Rejected</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: Colors.warning }]}>6</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>
          </View>
        );
        
      case 'inventory':
        return (
          <View>
            <Text style={styles.sectionTitle}>Current Blood Inventory</Text>
            <View style={styles.inventoryGrid}>
              {bloodTypeData.map((item) => (
                <View key={item.name} style={styles.inventoryItem}>
                  <Text style={[styles.bloodType, { color: item.color }]}>{item.name}</Text>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { 
                          width: `${(item.population / 15) * 100}%`,
                          backgroundColor: item.color,
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.inventoryAmount}>{item.population} units</Text>
                </View>
              ))}
            </View>
          </View>
        );
        
      case 'donors':
        return (
          <View>
            <Text style={styles.sectionTitle}>Donor Demographics</Text>
            <View style={styles.donorStats}>
              <View style={styles.donorStat}>
                <Text style={styles.donorStatValue}>156</Text>
                <Text style={styles.donorStatLabel}>Total Donors</Text>
              </View>
              <View style={styles.donorStatDivider} />
              <View style={styles.donorStat}>
                <Text style={styles.donorStatValue}>42%</Text>
                <Text style={styles.donorStatLabel}>Female</Text>
              </View>
              <View style={styles.donorStatDivider} />
              <View style={styles.donorStat}>
                <Text style={styles.donorStatValue}>58%</Text>
                <Text style={styles.donorStatLabel}>Male</Text>
              </View>
            </View>
            
            <Text style={[styles.sectionTitle, { marginTop: Spacing.xl }]}>Age Distribution</Text>
            <View style={styles.ageDistribution}>
              {[
                { range: '18-25', percentage: 28 },
                { range: '26-35', percentage: 42 },
                { range: '36-45', percentage: 18 },
                { range: '46-60', percentage: 10 },
                { range: '60+', percentage: 2 },
              ].map((item, index) => (
                <View key={index} style={styles.ageGroup}>
                  <View style={styles.ageBarContainer}>
                    <View 
                      style={[
                        styles.ageBar, 
                        { 
                          height: `${item.percentage * 2}%`,
                          backgroundColor: Colors.primary,
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.ageLabel}>{item.range}</Text>
                  <Text style={styles.agePercentage}>{item.percentage}%</Text>
                </View>
              ))}
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="download" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-social" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Range Picker */}
      <View style={styles.timeRangeContainer}>
        <Text style={styles.timeRangeLabel}>Time Range:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={timeRange}
            onValueChange={(itemValue) => setTimeRange(itemValue)}
            style={styles.picker}
            dropdownIconColor={Colors.primary}
          >
            {timeRanges.map((range) => (
              <Picker.Item 
                key={range.value} 
                label={range.label} 
                value={range.value} 
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Report Type Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reportTabs}
      >
        {reportTypes.map((report) => (
          <TouchableOpacity
            key={report.id}
            style={[
              styles.reportTab,
              activeReport === report.id && styles.activeReportTab,
            ]}
            onPress={() => setActiveReport(report.id)}
          >
            <Ionicons 
              name={report.icon} 
              size={20} 
              color={activeReport === report.id ? Colors.primary : Colors.text.secondary} 
              style={styles.reportTabIcon}
            />
            <Text 
              style={[
                styles.reportTabText,
                activeReport === report.id && styles.activeReportTabText,
              ]}
            >
              {report.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Report Content */}
      <ScrollView style={styles.content}>
        {renderReportContent()}
      </ScrollView>

      {/* Generate Report Button */}
      <TouchableOpacity 
        style={styles.generateButton}
        onPress={handleGenerateReport}
        disabled={isGenerating}
      >
        <Ionicons 
          name={isGenerating ? 'refresh' : 'download'} 
          size={20} 
          color={Colors.white} 
          style={isGenerating && styles.loadingIcon}
        />
        <Text style={styles.generateButtonText}>
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    ...Shadows.small,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  timeRangeLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginRight: Spacing.sm,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 6,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    color: Colors.text.primary,
  },
  reportTabs: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  reportTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    marginRight: Spacing.sm,
    backgroundColor: Colors.background.light,
  },
  activeReportTab: {
    backgroundColor: `${Colors.primary}10`,
  },
  reportTabIcon: {
    marginRight: Spacing.xs,
  },
  reportTabText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    fontWeight: Typography.fontWeight.medium,
  },
  activeReportTabText: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: 8,
    ...Shadows.small,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.sm,
    marginTop: Spacing.lg,
  },
  statCard: {
    width: '50%',
    padding: Spacing.sm,
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.xxs,
  },
  inventoryGrid: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.md,
    ...Shadows.small,
  },
  inventoryItem: {
    marginBottom: Spacing.md,
  },
  bloodType: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xxs,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.border.light,
    borderRadius: 4,
    marginVertical: Spacing.xxs,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  inventoryAmount: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'right',
  },
  donorStats: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  donorStat: {
    flex: 1,
    alignItems: 'center',
  },
  donorStatDivider: {
    width: 1,
    backgroundColor: Colors.border.light,
    marginVertical: Spacing.xs,
  },
  donorStatValue: {
    fontSize: Typography.fontSize['xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  donorStatLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.xxs,
  },
  ageDistribution: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    marginTop: Spacing.xl,
  },
  ageGroup: {
    alignItems: 'center',
    flex: 1,
  },
  ageBarContainer: {
    height: 150,
    width: 30,
    backgroundColor: Colors.background.light,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  ageBar: {
    width: '100%',
    backgroundColor: Colors.primary,
  },
  ageLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  agePercentage: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    margin: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  generateButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.sm,
  },
  loadingIcon: {
    transform: [{ rotate: '360deg' }],
  },
});
