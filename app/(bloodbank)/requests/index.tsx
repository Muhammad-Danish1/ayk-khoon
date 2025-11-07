import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, Typography, Shadows } from '../../../src/theme';
import { Card } from '../../../src/components/Card';

type RequestStatus = 'pending' | 'approved' | 'rejected' | 'completed';

interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  units: number;
  hospital: string;
  status: RequestStatus;
  date: string;
  urgency: 'low' | 'medium' | 'high';
}

// Mock data for blood requests
const initialRequests: BloodRequest[] = [
  {
    id: '1',
    patientName: 'John Smith',
    bloodType: 'A+',
    units: 2,
    hospital: 'City General Hospital',
    status: 'pending',
    date: '2023-11-15',
    urgency: 'high',
  },
  {
    id: '2',
    patientName: 'Sarah Johnson',
    bloodType: 'B-',
    units: 1,
    hospital: 'Central Medical Center',
    status: 'approved',
    date: '2023-11-14',
    urgency: 'medium',
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    bloodType: 'O+',
    units: 3,
    hospital: 'Metro Health',
    status: 'rejected',
    date: '2023-11-13',
    urgency: 'low',
  },
  {
    id: '4',
    patientName: 'Emma Wilson',
    bloodType: 'AB+',
    units: 2,
    hospital: 'Unity Hospital',
    status: 'completed',
    date: '2023-11-10',
    urgency: 'high',
  },
];

const statusColors = {
  pending: Colors.warning,
  approved: Colors.success,
  rejected: Colors.error,
  completed: Colors.info,
};

const urgencyColors = {
  high: Colors.error,
  medium: Colors.warning,
  low: Colors.success,
};

export default function BloodRequestsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [requests, setRequests] = useState<BloodRequest[]>(initialRequests);
  const [showFilters, setShowFilters] = useState(false);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.bloodType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
  };

  const getStatusCount = (status: RequestStatus) => {
    return requests.filter(req => req.status === status).length;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blood Requests</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={[styles.headerButton, showFilters && styles.activeFilterButton]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons 
              name="filter" 
              size={20} 
              color={showFilters ? Colors.primary : Colors.text.primary} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search requests..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.text.tertiary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery('')} 
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color={Colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Status Filters */}
      {showFilters && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              statusFilter === 'all' && styles.activeFilterButton
            ]}
            onPress={() => setStatusFilter('all')}
          >
            <Text style={[
              styles.filterButtonText,
              statusFilter === 'all' && styles.activeFilterText
            ]}>
              All ({requests.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              statusFilter === 'pending' && styles.activeFilterButton,
              { borderColor: statusColors.pending }
            ]}
            onPress={() => setStatusFilter('pending')}
          >
            <View style={[styles.statusDot, { backgroundColor: statusColors.pending }]} />
            <Text style={[
              styles.filterButtonText,
              statusFilter === 'pending' && styles.activeFilterText
            ]}>
              Pending ({getStatusCount('pending')})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              statusFilter === 'approved' && styles.activeFilterButton,
              { borderColor: statusColors.approved }
            ]}
            onPress={() => setStatusFilter('approved')}
          >
            <View style={[styles.statusDot, { backgroundColor: statusColors.approved }]} />
            <Text style={[
              styles.filterButtonText,
              statusFilter === 'approved' && styles.activeFilterText
            ]}>
              Approved ({getStatusCount('approved')})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              statusFilter === 'rejected' && styles.activeFilterButton,
              { borderColor: statusColors.rejected }
            ]}
            onPress={() => setStatusFilter('rejected')}
          >
            <View style={[styles.statusDot, { backgroundColor: statusColors.rejected }]} />
            <Text style={[
              styles.filterButtonText,
              statusFilter === 'rejected' && styles.activeFilterText
            ]}>
              Rejected ({getStatusCount('rejected')})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              statusFilter === 'completed' && styles.activeFilterButton,
              { borderColor: statusColors.completed }
            ]}
            onPress={() => setStatusFilter('completed')}
          >
            <View style={[styles.statusDot, { backgroundColor: statusColors.completed }]} />
            <Text style={[
              styles.filterButtonText,
              statusFilter === 'completed' && styles.activeFilterText
            ]}>
              Completed ({getStatusCount('completed')})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Request List */}
      <ScrollView style={styles.requestList}>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <Card key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View>
                  <Text style={styles.patientName}>{request.patientName}</Text>
                  <View style={styles.requestMeta}>
                    <View style={[styles.urgencyBadge, { backgroundColor: `${urgencyColors[request.urgency]}20` }]}>
                      <Text style={[styles.urgencyText, { color: urgencyColors[request.urgency] }]}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                      </Text>
                    </View>
                    <Text style={styles.requestDate}>{request.date}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${statusColors[request.status]}20` }]}>
                  <Text style={[styles.statusText, { color: statusColors[request.status] }]}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.requestDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="water" size={16} color={Colors.text.secondary} />
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Blood Type: </Text>
                    <Text style={[styles.bloodType, { color: Colors.primary }]}>{request.bloodType}</Text>
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="medical" size={16} color={Colors.text.secondary} />
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Units Required: </Text>
                    {request.units} units
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color={Colors.text.secondary} />
                  <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
                    {request.hospital}
                  </Text>
                </View>
              </View>
              
              {request.status === 'pending' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: Colors.error }]}
                    onPress={() => handleStatusChange(request.id, 'rejected')}
                  >
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: Colors.success }]}
                    onPress={() => handleStatusChange(request.id, 'approved')}
                  >
                    <Text style={styles.actionButtonText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              )}
              
              {request.status === 'approved' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: Colors.primary, flex: 1 }]}
                    onPress={() => {
                      // Navigate to complete request or show modal
                      handleStatusChange(request.id, 'completed');
                    }}
                  >
                    <Text style={styles.actionButtonText}>Mark as Completed</Text>
                  </TouchableOpacity>
                </View>
              )}
              
              {(request.status === 'rejected' || request.status === 'completed') && (
                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  onPress={() => {
                    // Navigate to request details
                    Alert.alert('Request Details', `Viewing details for ${request.patientName}'s request`);
                  }}
                >
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                </TouchableOpacity>
              )}
            </Card>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="file-tray-outline" size={48} color={Colors.text.tertiary} />
            <Text style={styles.emptyStateText}>No requests found</Text>
            <Text style={styles.emptyStateSubtext}>
              {statusFilter === 'all' 
                ? 'There are no blood requests at the moment.' 
                : `There are no ${statusFilter} requests.`}
            </Text>
          </View>
        )}
      </ScrollView>
      
      {/* New Request Button */}
      <TouchableOpacity 
        style={styles.newRequestButton}
        onPress={() => {
          // Navigate to create new request
          Alert.alert('New Request', 'Feature coming soon!');
        }}
      >
        <Ionicons name="add" size={24} color={Colors.white} />
        <Text style={styles.newRequestButtonText}>New Request</Text>
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  activeFilterButton: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    ...Shadows.small,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  clearButton: {
    padding: Spacing.xs,
  },
  filterContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
    marginRight: Spacing.sm,
    backgroundColor: Colors.white,
  },
  filterButtonText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  activeFilterText: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  requestList: {
    flex: 1,
    padding: Spacing.lg,
  },
  requestCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  patientName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  requestMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urgencyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: Spacing.sm,
  },
  urgencyText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  requestDate: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  requestDetails: {
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
  },
  detailLabel: {
    color: Colors.text.secondary,
  },
  bloodType: {
    fontWeight: Typography.fontWeight.bold,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
  },
  actionButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 6,
    marginLeft: Spacing.sm,
    minWidth: 100,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    marginTop: Spacing.xs,
  },
  viewDetailsText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginRight: Spacing.xxs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    marginTop: Spacing.xl,
  },
  emptyStateText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptyStateSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    maxWidth: 300,
  },
  newRequestButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    margin: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  newRequestButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.sm,
  },
});
