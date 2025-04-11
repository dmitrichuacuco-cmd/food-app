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

        <ion-buttons slot="end">
          <ion-button>
            <ion-icon
              slot="icon-only"
              :ios="cartOutline"
              :md="cartOutline"
            ></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title>{{ props.order?.category }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="food-card">
        <img
          :alt="props.order?.title"
          :src="props.order?.image"
          class="card-img"
        />
        <div>
          <ion-fab vertical="bottom" horizontal="end">
            <ion-fab-button>
              <ion-icon :icon="heartOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </div>
      </ion-card>

      <div>
        <h5>{{ props.order?.title }}</h5>
        <div class="star-rating">
          <ion-icon
            v-for="n in Math.floor(props.order?.rating ?? 0)"
            :key="'full-' + n"
            :icon="star"
          ></ion-icon>
          <ion-icon
            v-if="(props.order?.rating ?? 0) % 1 !== 0"
            :key="'half'"
            :icon="starHalfOutline"
          ></ion-icon>
          <ion-icon
            v-for="n in 5 - Math.ceil(props.order?.rating ?? 0)"
            :key="'empty-' + n"
            :icon="starOutline"
          ></ion-icon>
        </div>
        <h6>{{ props.order?.content }}</h6>
      </div>

      <div class="header-container">
        <h4>P {{ props.order?.price }}</h4>
        <div class="quantity-control">
          <button class="circle-btn" @click="decreaseQuantity">
            <ion-icon :icon="removeOutline" />
          </button>
          <span class="quantity-text">{{ quantity }}</span>
          <button class="circle-btn" @click="increaseQuantity">
            <ion-icon :icon="addOutline" />
          </button>
        </div>
      </div>

      <div class="header-container">
        <h4>Beverages</h4>
      </div>

      <ion-list>
        <ion-item>
          <ion-select
            v-model="selectedBeverage"
            aria-label="Soda"
            interface="popover"
            placeholder="Select beverage"
          >
            <ion-select-option
              v-for="bev in beverages"
              :key="bev.id"
              :value="bev.title.toLowerCase()"
            >
              {{ bev.title }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-segment value="regular">
        <ion-segment-button value="regular">
          <ion-label>Regular</ion-label>
        </ion-segment-button>
        <ion-segment-button value="large">
          <ion-label>Large</ion-label>
        </ion-segment-button>
        <ion-segment-button value="x-large">
          <ion-label>X-large</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div class="header-container">
        <h4>Add-Ons</h4>
      </div>

      <div class="side-card-container">
        <ion-card
          v-for="(side, index) in sides"
          :key="side.id"
          class="side-card"
        >
          <div class="card-flex">
            <div class="image-container">
              <img :src="side.image" />
            </div>
            <div class="card-text">
              <ion-card-header>
                <ion-checkbox justify="space-between" v-model="side.selected">
                  <ion-card-title class="small-title">{{side.title}}</ion-card-title>
                </ion-checkbox>
              </ion-card-header>
              <ion-card-content>{{ side.category }}</ion-card-content>
              <div class="side-row">
                <ion-label
                  ><strong>P {{ side.price }}</strong></ion-label
                >
                <div class="amount-container">
                  <button class="circle-btn" @click="decreaseAmount(index)">
                    <ion-icon :icon="removeOutline" />
                  </button>
                  <span class="quantity-text">{{ side.amount }}</span>
                  <button class="circle-btn" @click="increaseAmount(index)">
                    <ion-icon :icon="addOutline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ion-card>
      </div>

      <ion-button expand="block" @click="openModal">Add to Bag</ion-button>

      <ion-modal 
        :is-open="isModalOpen" 
        @did-dismiss="closeModal" 
        :backdrop-dismiss="false"
        :keyboard-close="false"
      >
        <ion-content class="modal-content">
          <ion-icon :icon="thumbsUpOutline" size="large"></ion-icon>
          <h4><strong>Successfully Added!</strong></h4>
          <h5>What do you want to do now?</h5>
          <div class="modal-buttons">
            <ion-button @click="goToSummary({ id: props.order?.id, order: props.order })">Proceed to Checkout</ion-button>
            <ion-button fill="clear" @click="goToOrders()">Add More</ion-button>
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
  IonBadge,
  IonImg,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonTabButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonList,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonModal,
} from "@ionic/vue";
import {
  diamondOutline,
  personCircleOutline,
  chevronForwardOutline,
  star,
  starOutline,
  starHalfOutline,
  optionsOutline,
  cartOutline,
  chevronBackOutline,
  heartOutline,
  heart,
  addOutline,
  removeOutline,
  thumbsUpOutline,
} from "ionicons/icons";
import { ref, onMounted } from "vue";

import { useRouter, useRoute } from "vue-router";

import { type Order } from "@/types/interfaces/Order";
import type {
  Beverage,
  Side,
  SubmissionData,
} from "@/types/interfaces/Preview";

const props = defineProps<{
  id: string | number;
  order: Order | null;
}>();

console.log(props.order)

const router = useRouter();
const route = useRoute();

const goToOrders = () => {
  router.push("/order");
  closeModal();
};

const goToSummary = (props: { id: number | undefined; order: Order | null }) => {
  closeModal();
  router.push({
    name: 'Summary',
    query: { order: JSON.stringify(props.order) }
  });
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

const beverages = [
  {
    id: 1,
    title: "Coke",
    price: 10,
  },
  {
    id: 2,
    title: "Sprite",
    price: 12,
  },
  {
    id: 3,
    title: "Royal",
    price: 15,
  },
  {
    id: 4,
    title: "Pepsi",
    price: 20,
  },
];

const selectedBeverage = ref("Coke");

const sides: Side[] = [
  {
    id: 1,
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "Tomato Sauce",
    category: "Sauce",
    price: 50,
    amount: ref(1),
    selected: false,
  },
  {
    id: 2,
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "White Rice",
    category: "Carbs",
    price: 70,
    amount: ref(1),
    selected: false,
  },
  {
    id: 3,
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "Pigs in a Blanket",
    category: "Protein",
    price: 55,
    amount: ref(1),
    selected: false,
  },
  {
    id: 4,
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "Breadsticks",
    category: "Carbs",
    price: 70,
    amount: ref(1),
    selected: false,
  },
];

const decreaseAmount = (index: number) => {
  if (sides[index].amount.value > 1) {
    sides[index].amount.value--;
  }
};

const increaseAmount = (index: number) => {
  sides[index].amount.value++;
};


const isModalOpen = ref(false);

const closeModal = () => {
  isModalOpen.value = false;
};

const openModal = () => {
  const data = submitData();
  console.log(data);
  isModalOpen.value = true;
};

// refactor with different logic once backend has been implemented
const submitData = (): SubmissionData => ({
  order: card.value!,
  quantity: quantity.value,
  selectedBeverage: selectedBeverage.value,
  sides: sides.filter((side) => side.selected),
});
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

.food-card {
  position: relative;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  --height: 30%;
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
</style>
