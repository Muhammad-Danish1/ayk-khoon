import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, Typography } from '../../../src/theme';
import { Button, Input } from '../../../src/components';

export default function SetupBloodBankScreen() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    bankName: '',
    registrationNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    licenseNumber: '',
    licenseExpiry: '',
    workingHours: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = () => {
    // Basic validation
    if (!formData.bankName || !formData.registrationNumber || !formData.contactPerson || 
        !formData.email || !formData.phone || !formData.address || !formData.city || 
        !formData.state || !formData.country || !formData.postalCode || 
        !formData.licenseNumber || !formData.licenseExpiry) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    // Phone validation (basic)
    if (formData.phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success', 
        'Blood bank registration submitted for approval. You will be notified once approved.',
        [
          { 
            text: 'OK', 
            onPress: () => router.replace('/(user)/profile')
          }
        ]
      );
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Blood Bank</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <Input
          label="Blood Bank Name *"
          placeholder="Enter blood bank name"
          value={formData.bankName}
          onChangeText={(text) => handleInputChange('bankName', text)}
          containerStyle={styles.inputContainer}
        />
        
        <View style={styles.row}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: Spacing.sm }]}>
            <Input
              label="Registration Number *"
              placeholder="Enter registration number"
              value={formData.registrationNumber}
              onChangeText={(text) => handleInputChange('registrationNumber', text)}
            />
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Input
              label="License Number *"
              placeholder="Enter license number"
              value={formData.licenseNumber}
              onChangeText={(text) => handleInputChange('licenseNumber', text)}
            />
          </View>
        </View>
        
        <Input
          label="Contact Person *"
          placeholder="Enter contact person name"
          value={formData.contactPerson}
          onChangeText={(text) => handleInputChange('contactPerson', text)}
          containerStyle={styles.inputContainer}
        />
        
        <View style={styles.row}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: Spacing.sm }]}>
            <Input
              label="Email *"
              placeholder="Enter email address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Input
              label="Phone *"
              placeholder="Enter phone number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { marginTop: Spacing.xl }]}>Address Information</Text>
        
        <Input
          label="Address *"
          placeholder="Enter street address"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          containerStyle={styles.inputContainer}
        />
        
        <View style={styles.row}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: Spacing.sm }]}>
            <Input
              label="City *"
              placeholder="Enter city"
              value={formData.city}
              onChangeText={(text) => handleInputChange('city', text)}
            />
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Input
              label="State/Province *"
              placeholder="Enter state/province"
              value={formData.state}
              onChangeText={(text) => handleInputChange('state', text)}
            />
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: Spacing.sm }]}>
            <Input
              label="Country *"
              placeholder="Enter country"
              value={formData.country}
              onChangeText={(text) => handleInputChange('country', text)}
            />
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Input
              label="Postal Code *"
              placeholder="Enter postal code"
              value={formData.postalCode}
              onChangeText={(text) => handleInputChange('postalCode', text)}
              keyboardType="number-pad"
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { marginTop: Spacing.xl }]}>Additional Information</Text>
        
        <View style={styles.row}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: Spacing.sm }]}>
            <Input
              label="License Expiry Date *"
              placeholder="DD/MM/YYYY"
              value={formData.licenseExpiry}
              onChangeText={(text) => handleInputChange('licenseExpiry', text)}
            />
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Input
              label="Working Hours"
              placeholder="e.g., 9:00 AM - 5:00 PM"
              value={formData.workingHours}
              onChangeText={(text) => handleInputChange('workingHours', text)}
            />
          </View>
        </View>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By registering, you agree to our Terms of Service and Privacy Policy. 
            Your blood bank will be verified before approval.
          </Text>
        </View>
        
        <Button
          title={isLoading ? 'Submitting...' : 'Submit for Approval'}
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={isLoading}
        />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have a blood bank account? 
            <Text 
              style={styles.loginLink}
              onPress={() => router.push('/(auth)/login?type=bloodbank')}
            >
              {' '}Login here
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: Spacing.lg,
    top: Spacing.xl + 10,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    textAlign: 'center',
  },
  formContainer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  termsContainer: {
    backgroundColor: Colors.background.light,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginVertical: Spacing.lg,
  },
  termsText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  submitButton: {
    marginTop: Spacing.sm,
  },
  footer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});
