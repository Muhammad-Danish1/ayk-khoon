import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, Typography, Shadows } from '../../../../src/theme';
import { Card } from '../../../../src/components/Card';

// Mock data for the request
const requestData = {
  id: 'REQ-12345',
  patientName: 'Sarah Johnson',
  bloodType: 'A+',
  unitsRequired: 2,
  hospital: 'City General Hospital',
  location: '123 Medical Center Dr, New York, NY',
  date: '2023-11-15',
  time: '10:00 AM',
  urgency: 'high',
  status: 'pending',
  contactPerson: 'Dr. Michael Brown',
  contactNumber: '+1 (555) 123-4567',
  additionalNotes: 'Patient requires blood for upcoming surgery. Please ensure blood is cross-matched before donation.',
  requestedBy: 'Dr. Michael Brown',
  requestDate: '2023-11-10',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return Colors.warning;
    case 'approved':
      return Colors.success;
    case 'rejected':
      return Colors.error;
    case 'completed':
      return Colors.info;
    default:
      return Colors.text.secondary;
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return Colors.error;
    case 'medium':
      return Colors.warning;
    case 'low':
      return Colors.success;
    default:
      return Colors.text.secondary;
  }
};

export default function RequestDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // In a real app, you would fetch the request details using the id
  const request = requestData;

  const handleDonate = () => {
    Alert.alert(
      'Confirm Donation',
      'Are you sure you want to donate blood for this request?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Handle donation confirmation
            Alert.alert('Success', 'Thank you for your willingness to donate! The hospital will contact you soon.');
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Details</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-social" size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Request Status */}
        <View style={styles.statusContainer}>
          <View style={styles.requestIdContainer}>
            <Text style={styles.requestId}>Request #{request.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(request.status)}20` }]}>
              <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={[styles.urgencyBadge, { backgroundColor: `${getUrgencyColor(request.urgency)}20` }]}>
            <Ionicons 
              name="warning" 
              size={16} 
              color={getUrgencyColor(request.urgency)} 
              style={styles.urgencyIcon} 
            />
            <Text style={[styles.urgencyText, { color: getUrgencyColor(request.urgency) }]}>
              {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
            </Text>
          </View>
        </View>

        {/* Patient Info */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Patient Information</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Patient Name:</Text>
            <Text style={styles.detailValue}>{request.patientName}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Blood Type:</Text>
            <View style={styles.bloodTypeContainer}>
              <Text style={[styles.bloodType, { color: Colors.primary }]}>{request.bloodType}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Units Required:</Text>
            <Text style={styles.detailValue}>{request.unitsRequired} units</Text>
          </View>
        </Card>

        {/* Hospital Info */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medkit" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Hospital Information</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hospital Name:</Text>
            <Text style={styles.detailValue}>{request.hospital}</Text>
          </View>
          
          <View style={[styles.detailRow, { alignItems: 'flex-start' }]}>
            <Text style={[styles.detailLabel, { marginTop: 4 }]}>Location:</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color={Colors.text.secondary} style={styles.locationIcon} />
              <Text style={[styles.detailValue, { flex: 1 }]}>{request.location}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact Person:</Text>
            <Text style={styles.detailValue}>{request.contactPerson}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact Number:</Text>
            <TouchableOpacity>
              <Text style={[styles.detailValue, { color: Colors.primary }]}>{request.contactNumber}</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Appointment Details */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Appointment Details</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{request.date}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{request.time}</Text>
          </View>
        </Card>

        {/* Additional Notes */}
        {request.additionalNotes && (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Additional Notes</Text>
            </View>
            <Text style={styles.notesText}>{request.additionalNotes}</Text>
          </Card>
        )}

        {/* Request Info */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Request Information</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Requested By:</Text>
            <Text style={styles.detailValue}>{request.requestedBy}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Request Date:</Text>
            <Text style={styles.detailValue}>{request.requestDate}</Text>
          </View>
        </Card>
      </ScrollView>

      {/* Action Buttons */}
      {request.status === 'pending' && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: Colors.error }]}
            onPress={() => {}}
          >
            <Ionicons name="close-circle" size={20} color={Colors.white} />
            <Text style={styles.actionButtonText}>Decline</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: Colors.primary }]}
            onPress={handleDonate}
          >
            <Ionicons name="water" size={20} color={Colors.white} />
            <Text style={styles.actionButtonText}>Donate Blood</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {request.status === 'approved' && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: Colors.primary, flex: 1 }]}
            onPress={() => {}}
          >
            <Ionicons name="navigate" size={20} color={Colors.white} />
            <Text style={styles.actionButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: Colors.primary,
    paddingTop: Spacing.xl + 10,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    ...Shadows.medium,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    paddingBottom: 100, // Extra padding for the footer
  },
  statusContainer: {
    marginBottom: Spacing.lg,
  },
  requestIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  requestId: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 10,
  },
  urgencyIcon: {
    marginRight: 4,
  },
  urgencyText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  section: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    flex: 1,
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    flex: 1.5,
    textAlign: 'right',
  },
  bloodTypeContainer: {
    alignItems: 'flex-end',
  },
  bloodType: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1.5,
  },
  locationIcon: {
    marginTop: 2,
    marginRight: 4,
  },
  notesText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    padding: Spacing.md,
    ...Shadows.medium,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: 8,
    marginHorizontal: Spacing.xs,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.xs,
  },
});
