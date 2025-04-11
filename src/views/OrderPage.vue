<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" class="menu-with-badge">
          <ion-menu-button></ion-menu-button>
          <ion-badge class="menu-badge" color="warning">1</ion-badge>
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

        <ion-title>Our Foods</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-searchbar
        v-model="searchTerm"
        :clear-icon="optionsOutline"
        placeholder="Search for specific item"
        class="custom"
      ></ion-searchbar>

      <ion-segment
        v-model="selectedCategory"
        :scrollable="true"
        color="primary"
        class="rounded-segment"
      >
        <ion-segment-button value="all">
          <ion-label>All</ion-label>
        </ion-segment-button>
        <ion-segment-button value="breakfast">
          <ion-label>Breakfast</ion-label>
        </ion-segment-button>
        <ion-segment-button value="chicken">
          <ion-label>Chicken</ion-label>
        </ion-segment-button>
        <ion-segment-button value="seafood">
          <ion-label>Seafood</ion-label>
        </ion-segment-button>
        <ion-segment-button value="meat">
          <ion-label>Meat</ion-label>
        </ion-segment-button>
        <ion-segment-button value="dessert">
          <ion-label>Dessert</ion-label>
        </ion-segment-button>
        <ion-segment-button value="dinner">
          <ion-label>Dinner</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-grid>
        <ion-row>
          <ion-col
            v-for="(card, index) in filteredCards"
            :key="index"
            size="6"
            size-md="4"
            size-lg="2"
          >
            <ion-card @click="goToPreview(card)">
              <img :alt="card.title" :src="card.image" />
              <ion-card-header>
                <ion-card-title>{{ card.title }}</ion-card-title>
                <ion-card-subtitle>{{ card.category }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <div class="card-content-row">
                  <p class="price">{{ card.price }}</p>
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
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonSegmentView,
  IonSegmentContent,
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
} from "ionicons/icons";
import { computed, ref } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const goToPreview = (card: { id: any }) => {
  router.push({
    name: "Preview",
    params: { id: card.id },
    query: { order: JSON.stringify(card) },
  });
};

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

const selectedCategory = ref("all");

const filteredCards = computed(() => {
  return cards.filter((card) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      card.category.toLowerCase() === selectedCategory.value;

    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      card.category.toLowerCase().includes(searchTerm.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});

const searchTerm = ref("");
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

ion-searchbar.custom {
  --background: #19226d;
  --color: #fff;
  --placeholder-color: #fff;
  --icon-color: #fff;
  --clear-button-color: #fff;

  --border-radius: 12px;
}

ion-searchbar.ios.custom {
  --cancel-button-color: #19226d;
}

ion-searchbar.md.custom {
  --cancel-button-color: #fff;
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

ion-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

ion-card img {
  height: 120px;
  object-fit: cover;
  width: 100%;
}

ion-card-header {
  flex: 0 0 auto;
}

ion-card-title,
ion-card-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

ion-card-title {
  -webkit-line-clamp: 1; 
  font-size: 16px;
  font-weight: bold;
}

ion-card-subtitle {
  -webkit-line-clamp: 1; 
  font-size: 14px;
  color: gray;
}

ion-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-content-row {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

</style>
