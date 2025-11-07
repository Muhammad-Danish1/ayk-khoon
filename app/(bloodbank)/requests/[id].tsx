import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Card } from '../../../src/theme';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock data for request details
  const request = {
    id,
    patientName: 'Sarah Johnson',
    bloodType: 'A+',
    unitsRequired: 2,
    priority: 'High',
    status: 'Pending',
    hospital: 'City General Hospital',
    location: '123 Medical Center Dr, New York, NY',
    requestedBy: 'Dr. Michael Brown',
    requestDate: '2023-11-06',
    neededBy: '2023-11-15',
    contactNumber: '+1 (555) 123-4567',
    notes: 'Patient requires blood for upcoming surgery. Please ensure blood is cross-matched before delivery.',
  };

  const handleApprove = () => {
    // Handle approve action
    console.log('Request approved:', id);
  };

  const handleReject = () => {
    // Handle reject action
    console.log('Request rejected:', id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request #{id}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: `${getPriorityColor(request.priority)}20` }]}>
            <Text style={[styles.statusText, { color: getPriorityColor(request.priority) }]}>
              {request.priority} Priority
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: Colors.primary + '20' }]}>
            <Text style={[styles.statusText, { color: Colors.primary }]}>
              {request.status}
            </Text>
          </View>
        </View>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Patient Name:</Text>
            <Text style={styles.detailValue}>{request.patientName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Blood Type:</Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>{request.bloodType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Units Required:</Text>
            <Text style={styles.detailValue}>{request.unitsRequired} units</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Request Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hospital:</Text>
            <Text style={styles.detailValue} numberOfLines={2} ellipsizeMode="tail">
              {request.hospital}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue} numberOfLines={2} ellipsizeMode="tail">
              {request.location}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Requested By:</Text>
            <Text style={styles.detailValue}>{request.requestedBy}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Request Date:</Text>
            <Text style={styles.detailValue}>{request.requestDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Needed By:</Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>{request.neededBy}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact:</Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>{request.contactNumber}</Text>
          </View>
        </Card>

        {request.notes && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <Text style={styles.notesText}>{request.notes}</Text>
          </Card>
        )}
      </ScrollView>

      {request.status === 'Pending' && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: Colors.error }]}
            onPress={handleReject}
          >
            <Text style={styles.buttonText}>Reject Request</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: Colors.success }]}
            onPress={handleApprove}
          >
            <Text style={styles.buttonText}>Approve Request</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    ...Typography.heading2,
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    marginRight: Spacing.sm,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  section: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.heading3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    ...Typography.body2,
    color: Colors.text.secondary,
    flex: 1,
  },
  detailValue: {
    ...Typography.body1,
    color: Colors.text.primary,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.md,
  },
  notesText: {
    ...Typography.body1,
    color: Colors.text.primary,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  button: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: Spacing.sm,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontWeight: '600',
  },
});
