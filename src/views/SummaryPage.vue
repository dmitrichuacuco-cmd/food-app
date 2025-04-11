<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click="goToOrders()">
          <ion-button>
            <ion-icon
              slot="icon-only"
              :ios="chevronBackOutline"
              :md="chevronBackOutline"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Order Summary</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ user.firstName }} {{ user.lastName }}</ion-card-title>
          <ion-card-subtitle>{{ user.contactNumber }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <h5>{{ user.email }}</h5>
        </ion-card-content>
      </ion-card>

      <ion-radio-group v-model="selectedAddress">
        <ion-card
          v-for="address in addressOptions"
          :key="address.value"
          class="radio-card"
        >
          <ion-item lines="none">
            <ion-label class="ion-text-wrap">
              <h5 class="text-base font-medium">{{ address.title }}</h5>
              <p class="text-sm text-gray-500">{{ address.description }}</p>
            </ion-label>
            <ion-radio slot="end" :value="address.value"></ion-radio>
          </ion-item>
        </ion-card>
      </ion-radio-group>

      <div class="header-container">
        <h4>Orders</h4>
      </div>

      <!-- Refactor subtitles for loop when cart data has been implemented, also replace static subtitles with sides.data -->
      <div class="side-card-container">
        <ion-card class="side-card">
          <div class="card-flex">
            <div class="image-container">
              <img :src="props.order?.image" />
            </div>
            <div class="card-text">
              <ion-card-header>
                <ion-card-title class="small-title">{{ props.order?.title }}</ion-card-title>
                <ion-card-subtitle>Subtitle 1</ion-card-subtitle>
                <ion-card-subtitle>Subtitle 2</ion-card-subtitle>
                <ion-card-subtitle>Subtitle 3</ion-card-subtitle>
              </ion-card-header>

              <div class="side-row">
                <ion-label><strong>P {{ props.order?.price }}</strong></ion-label>
                <div class="amount-container">
                  <button class="circle-btn" @click="decreaseQuantity()">
                    <ion-icon :icon="removeOutline" />
                  </button>
                  <span class="quantity-text">{{ quantity }}</span>
                  <button class="circle-btn" @click="increaseQuantity()">
                    <ion-icon :icon="addOutline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ion-card>
      </div>

      <!-- Refactor to implement schema logic to prevent submission without selected payment method -->
      <div class="header-container">
        <h4>Payment Option</h4>
      </div>

      <ion-radio-group v-model="selectedPayment">
        <ion-card
          v-for="option in paymentOptions"
          :key="option.value"
          class="radio-card"
        >
          <ion-item lines="none">
            <ion-label class="ion-text-wrap">
              <h5 class="text-base font-medium">{{ option.title }}</h5>
              <p class="text-sm text-gray-500">{{ option.description }}</p>
            </ion-label>
            <ion-radio slot="end" :value="option.value"></ion-radio>
          </ion-item>
        </ion-card>
      </ion-radio-group>

      <!-- Replace static values with props.data after backend is implemented -->
      <div class="header-container">
        <h5>Subtotal</h5>
        <h5>P 185</h5>
      </div>

      <div class="header-container">
        <h5>Delivery Charge</h5>
        <h5>P 59</h5>
      </div>

      <div class="header-container">
        <h5>Grand Total: P 244</h5>
        <ion-button expand="block" @click="openModal">Place Order</ion-button>
      </div>

      <ion-modal
        :is-open="isModalOpen"
        @did-dismiss="closeModal"
        :backdrop-dismiss="false"
        :keyboard-close="false"
      >
        <ion-content class="modal-content">
          <ion-icon :icon="thumbsUpOutline" size="large"></ion-icon>
          <h4><strong>Order Received</strong></h4>
          <h5>
            Your order No. 19049585 has successfully been taken and is now being
            processed. Kindly wait for our notification regarding your order.
          </h5>
          <div class="modal-buttons">
            <ion-button>Track Order</ion-button>
            <ion-button fill="clear" @click="goToHome()"
              >Back to Home</ion-button
            >
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonNavLink,
  IonIcon,
  IonSearchbar,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonModal,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";
import {
  chevronBackOutline,
  heartOutline,
  heart,
  addOutline,
  removeOutline,
  thumbsUpOutline,
} from "ionicons/icons";
import { ref, onMounted, computed } from "vue";

import { useRouter, useRoute } from "vue-router";

import { type Order } from "@/types/interfaces/Order";

const props = defineProps<{
  id: string | number;
  order: Order | null;
  sides: Array<{ id: number; title: string; price: number; selected: boolean }>;
}>();

console.log(props)

const router = useRouter();
const route = useRoute();


const goToOrders = () => {
  router.push("/order");
  closeModal();
};

const goToHome = () => {
  router.push("/home");
  closeModal();
};

const card = ref(null);
if (route.query.data) {
  console.log(card);
  try {
    card.value = JSON.parse(route.query.data as string);
  } catch (e) {
    console.error("Invalid card data", e);
  }
}

const quantity = ref(1);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const isModalOpen = ref(false);

const closeModal = () => {
  isModalOpen.value = false;
};

const openModal = () => {
  isModalOpen.value = true;
};

//replace data with useProps once backend has been connected

const user = {
  firstName: "Sung",
  lastName: "Jin-Woo",
  contactNumber: "+63 912 345 6789",
  points: 120,
  email: "sololeveling@gmail.com"
};

const selectedAddress = ref("home");

const addressOptions = [
  {
    value: "home",
    title: "My Home Address",
    description:
      "No. 21 St. Agustin Street, Brgy De Jose Delgado City 2234 Philippines",
  },
  {
    value: "office",
    title: "Work/Office",
    description:
      "3rd flr Anyeong Bldg. Seareal St. Joaqin CIty 3456 Philippines",
  },
];

const selectedPayment = ref("1");

const paymentOptions = [
  {
    value: "1",
    title: "Call on Delivery",
    description: "Pay when you receive the order",
  },
  {
    value: "2",
    title: "Loyalty Points",
    description: "Pay using your earned loyalty points",
  },
  {
    value: "3",
    title: "Paypal",
    description: "A new tab will open to access your account",
  },
  {
    value: "4",
    title: "Paynamics",
    description: "Choose Paynamics services available to you",
  },
];
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.menu-with-badge {
  position: relative;
}

.menu-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  padding: 0;
  border-radius: 50%;
  font-size: 0;
}

ion-searchbar.custom-searchbar {
  width: 100%; 
  padding-left: 16px !important; 
  padding-right: 16px !important; 
  height: 60px !important; 
}

@media (min-width: 768px) {
  .menu-badge {
    display: none;
  }
}

.rounded-segment {
  --border-radius: 9999px; 
  --indicator-border-radius: 9999px;
  padding: 4px;
  background-color: var(--ion-color-light);
  border-radius: 9999px;
}

.rounded-segment::-webkit-scrollbar {
  display: none; /*For Chrome, Safari, Opera */
}

.rounded-segment {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* For Firefox */
}

ion-segment-button {
  --border-radius: 9999px;
  margin: 2px;
}

.card-content-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-weight: bold;
}

.fab-wrapper {
  position: relative;
  height: 56px; 
  margin-top: 1rem;
}

.fab-wrapper ion-fab {
  position: absolute;
  bottom: 0;
  right: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-container h4 h5 {
  font-weight: bold;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.circle-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: #3880ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  padding: 0;
}

.circle-btn ion-icon {
  font-size: 20px;
}

.quantity-text {
  font-size: 1.1rem;
  width: 24px;
  text-align: center;
}

.side-card-container ion-card {
  border-radius: 16px;
}

.side-card {
  padding: 0;
  overflow: hidden;
  height: 160px; 
}

.card-flex {
  display: flex;
  height: 100%;
}

.image-container {
  flex: 0 0 30%;
  height: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-text {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.points-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 14px;
  padding-bottom: 12px;
}

.small-title {
  font-size: 18px; 
}

.side-row {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding-left: 20px;
  padding-bottom: 12px;
}

.amount-container {
  display: flex;
  align-items: center;
  justify-content: flex-end; 
}

.quantity-text {
  margin: 0 10px; 
}

.circle-btn {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.side-row ion-label {
  margin-right: 10px; 
}

ion-modal {
  --width: 80%;
  --height: 40%;
  --border-radius: 20px;
}

@media (min-width: 768px) {
  ion-modal {
    --width: 40%;
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}

.modal-content ion-icon {
  margin-top: 20px;
}

ion-button {
  margin-top: 10px;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
}

.radio-card {
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: var(--ion-box-shadow);
}
</style>
