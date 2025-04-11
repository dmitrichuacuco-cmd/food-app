<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" class="menu-with-badge">
          <ion-menu-button />
          <ion-badge class="menu-badge" color="warning">1</ion-badge>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button>
            <ion-icon
              slot="icon-only"
              :ios="personCircleOutline"
              :md="personCircleOutline"
            ></ion-icon>
          </ion-button>
        </ion-buttons>

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            gap: 8px;
          "
        >
          <ion-icon :icon="diamondOutline" size="large"></ion-icon>
          <span style="font-size: 18px; font-weight: 500">
            {{ user.points }} Points
          </span>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-align-items-start ion-margin-bottom">
          <ion-col size="auto">
            <ion-img
              src="/images/favicon.png"
              alt="Logo"
              style="width: 64px; height: 64px"
            ></ion-img>
          </ion-col>
          <ion-col>
            <ion-text color="medium">
              <p class="ion-no-margin ion-margin-bottom">
                Anneoyong, {{ user.firstName }}!
              </p>
            </ion-text>
            <ion-text>
              <h1
                class="ion-no-margin"
                style="font-weight: bold; font-size: 24px"
              >
                What do you want to eat?
              </h1>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-searchbar
        showCancelButton="focus"
        class="custom"
        placeholder="Try out our new Steak Fries Veggies"
      ></ion-searchbar>

      <div class="header-container">
        <h4>Special Offers!</h4>
        <ion-button fill="clear">
          View All
          <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
        </ion-button>
      </div>

      <div class="offers-card-container">
        <ion-card v-for="(card, index) in cards" :key="index">
          <img :src="card.image" />
        </ion-card>
      </div>

      <div class="header-container">
        <h4>Category</h4>
      </div>

      <div class="category-card-container">
        <ion-card v-for="(card, index) in cards" :key="index">
          <div class="image-container">
            <img :src="card.image" />
            <div class="card-text">
              <ion-card-header>
                <ion-card-title>{{ card.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>{{ card.content }}</ion-card-content>
            </div>
          </div>
        </ion-card>
      </div>

      <div class="header-container">
        <h4>Whats New?</h4>
      </div>

      <div class="new-card-container">
        <ion-card class="food-card">
          <img alt="Silhouette of mountains" src="https://imgs.search.brave.com/tLSIrs91e38Q6DCRYEXul2xcIbNlFNriFGbhGDDPWTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzQ3MDI4NTExL3Iv/aWwvYzlkMzU3LzUz/NzYzNDEyODcvaWxf/NjAweDYwMC41Mzc2/MzQxMjg3X2RrNnIu/anBn" class="card-img"/>
        </ion-card>
      </div>

      <div class="header-container">
        <h4>Most Popular</h4>
      </div>
      
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="(card, index) in cards" 
            :key="index"
            size="6" size-md="4" size-lg="2"
          >
          <div class="popular-card-container">
            <ion-card>
              <img :alt="card.title" :src="card.image" />
              <ion-card-header>
                <ion-card-title>{{ card.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <div class="star-rating">
                  <ion-icon
                    v-for="n in Math.floor(card.rating)"
                    :key="'full-' + n"
                    :icon="star"
                  ></ion-icon>
                  <ion-icon
                    v-if="card.rating % 1 !== 0"
                    :key="'half'"
                    :icon="starHalfOutline"
                  ></ion-icon>
                  <ion-icon
                    v-for="n in 5 - Math.ceil(card.rating)"
                    :key="'empty-' + n"
                    :icon="starOutline"
                  ></ion-icon>
                </div>
                <p>{{ card.content }}</p>
              </ion-card-content>
            </ion-card>
          </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Call-to-action button -->
      <ion-button slot="fixed" @click="goToOrders">Order Now!</ion-button>
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
} from "@ionic/vue";
import {
  diamondOutline,
  personCircleOutline,
  chevronForwardOutline,
  star,
  starOutline,
  starHalfOutline,
} from "ionicons/icons";
import { onMounted } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const goToOrders = () => {
  router.push("/order");
};

onMounted(() => {
  const containers = document.querySelectorAll<HTMLElement>(
    '.category-card-container, .offers-card-container'
  );

  containers.forEach((container) => {
    container.addEventListener(
      'wheel',
      (e) => {
        const event = e as WheelEvent;
        if (event.deltaY === 0) return;
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      },
      { passive: false }
    );
  });
});




// replace with JSON data from backend API
const cards = [
  {
    id: 1,
    image: "https://imgs.search.brave.com/muBrq1pldskvUEEbWyiW5Voqc0HXcozpQitfuP50v5Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcz/NjE5ODk3L3Bob3Rv/L2lza2VuZGVyLWtl/YmFiLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz14UEVIbGYx/bVJJVWhKYjBvN0lY/d1pDTkpSWGp6Y1gz/Zkp4RTYzVjlCRWZr/PQ",
    title: "Iskander Kebab",
    content: "A hearty turkish meal",
    category: "Meat",
    price: 100,
    rating: 3,
  },
  {
    id: 2,
    image: "https://imgs.search.brave.com/KEpixKGULxoT8WhLmP7xU-0LGDO7_toJChzAgMU-4oQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjY5/NTY2OTI0L3Bob3Rv/L2Jha2xhdmEuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTJY/T1dZVnhmZk5fMW5Q/dDRRNkhQRTdWOUVB/SmNTejhOX045a3Fx/cXdyM2s9",
    title: "Baklava",
    content: "A classic Turkish dessert",
    category: "Dessert",
    price: 120,
    rating: 3.5,
  },
  {
    id: 3,
    image: "https://imgs.search.brave.com/SjIuL5DGY6sjo8UkYFqclHS3066lDWYSyEEEQbZCU1I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5Lzg2LzI4Lzcz/LzM2MF9GXzk4NjI4/NzM2MF9FUGNGNUxK/ZWZDQlp2YnJOTzA4/NExpQ2h6V2llc0Fn/Qi5qcGc",
    title: "Chicken Biryani",
    content: "Indian chicken rice dish flavoured with spices",
    category: "Chicken",
    price: 150,
    rating: 4,
  },
  {
    id: 4,
    image: "https://imgs.search.brave.com/E8jmJE5NEb-2yykg7kGpvsENb-K4z5QFP0rQ6sEBPqI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzUzLzEwLzg5/LzM2MF9GXzEwNTMx/MDg5MjBfYU5HYjMw/c09JMU85VHBFb3VT/NG5ZTkR0bTdpODdX/clguanBn",
    title: "Matcha Cheesecake",
    content: "Japanese matcha dessert",
    category: "Dessert",
    price: 200,
    rating: 5,
  },
  {
    id: 5,
    image: "https://imgs.search.brave.com/jEIf7JHMGzp1fhdrK2SoZgXiqdri0DzVef6KRZE-G4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vdHRv/bGVuZ2hpLmNvLnVr/L2Nkbi9zaG9wL2Zp/bGVzL3NoYWtzaHVr/YS02XzFfMS5qcGc_/dj0xNzA4MDkwMjgw/JndpZHRoPTEwMDA",
    title: "Shakshouka",
    content: "A classic middle eastern tomato based breakfast",
    category: "Breakfast",
    price: 120,
    rating: 5,
  },
  {
    id: 6,
    image: "https://imgs.search.brave.com/kKnJKzeiImFrJgeJkeMF6WAQSwRYdCp2sur8FNmOQn4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzE2LzMzLzY3/LzM2MF9GXzE2MzM2/NzA1X0dWMHhHVDZN/TlNOTzBLWllsSG1M/THFCb3F4S3U4QnhF/LmpwZw",
    title: "Falafel",
    content: "A classic Israeli vegeteranean dish",
    category: "Dinner",
    price: 80,
    rating: 4.5,
  },
  {
    id: 7,
    image: "https://imgs.search.brave.com/wUqh4rZlIFhrvM5f8RcGm94vqty6AosM6QXMYMtn-ZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFuaGVhbHRo/eXJlY2lwZXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIz/LzA0L2J1dHRlci1j/aGlja2VuLXJlY2lw/ZS53ZWJw",
    title: "Butter Chicken",
    content: "A classic Indian curry dish",
    category: "Chicken",
    price: 180,
    rating: 5,
  },



  
];

const user = {
  firstName: "Sung",
  lastName: "Jin-Woo",
  contactNumber: "09123456789",
  points: 120,
};
</script>

<style scoped>

ion-toolbar {
  --background: black;
  --color: white;
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

@media (min-width: 768px) {
  .menu-badge {
    display: none;
  }
}

.crown-icon {
  font-size: 16px;
}

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

ion-searchbar.custom {
  --background: #19226d;
  --color: #fff;
  --placeholder-color: #fff;
  --icon-color: #fff;
  --clear-button-color: #fff;

  --border-radius: 12px;
}

ion-searchbar.ios.custom {
  --cancel-button-color: #F8F8FF;
}

ion-searchbar.md.custom {
  --cancel-button-color: #fff;
}

ion-button[slot="fixed"] {
  position: absolute;
  bottom: 20px;
  left: 70%;
}
@media screen and (min-width: 1024px) {
  ion-button[slot="fixed"] {
    left: 85%;
  }
}

/* Offers CSS start */
.header-container {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
}

.header-container h4 {
  font-weight: bold;
}

.offers-card-container {
  display: flex;
  overflow-x: auto; 
  padding: 16px;
}

.offers-card-container ion-card {
  width: 275px;
  height: 150px;
  flex-shrink: 0; 
  border-radius: 16px;
}
/* Offers CSS end */
/* Category CSS start */
.category-card-container {
  display: flex;
  overflow-x: auto;
  padding: 16px;
}

.category-card-container ion-card {
  width: 275px;
  height: 375px;
  flex-shrink: 0;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.category-card-container .image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.category-card-container .image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.category-card-container .card-text {
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 8px;
  max-width: 80%;
}
/* Category CSS end */

.new-card-container {
  height: 400px;
  width: 100%;
}
.new-card-container ion-card {
  width: 100%;
  height: 100%;
  border-radius: 16px;
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

.offers-card-container::-webkit-scrollbar {
  display: none; /*For Chrome, Safari, Opera */
}

.offers-card-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* For Firefox */
}

.category-card-container::-webkit-scrollbar {
  display: none; /*For Chrome, Safari, Opera */
}

.category-card-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* For Firefox */
}

.popular-card-container {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

.popular-card-container ion-card {
  border-radius: 16px;
  height: 280px;
  display: flex;
  flex-direction: column;
}

.popular-card-container ion-card img {
  height: 120px;
  object-fit: cover;
  width: 100%;
}

</style>
