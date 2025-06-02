export interface FormData {
  currentStep: number;
  agreementStep1: boolean;
  agreementStep2: boolean;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  address: string;
  isLoading: boolean;
  verificationStatus: 'pending' | 'validated' | 'waiting' | null;
}