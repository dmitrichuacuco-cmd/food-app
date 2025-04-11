<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Loyalty Points</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="header-container">
        <ion-icon :icon="diamondOutline" size="large"></ion-icon>
        <h4>Beginner Tier</h4>
        <ion-button fill="clear">
          View All
          <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
        </ion-button>
      </div>
      <div>
        <h5>
          Earn points by purchasing from our store. Vestibulum ante ipsum primis
          in faucibus orci luctus et.
        </h5>
      </div>

      <div class="chart-container">
        <canvas id="pointsChart"></canvas>
      </div>

      <div class="header-container">
        <h4>Rewards</h4>
        <ion-button fill="clear">
          How it Works
          <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
        </ion-button>
      </div>

      <ion-segment value="all" color="primary" class="rounded-segment" v-model="selectedCategory">
        <ion-segment-button value="all">
          <ion-label>All</ion-label>
        </ion-segment-button>
        <ion-segment-button value="beginner">
          <ion-label>Beginner</ion-label>
        </ion-segment-button>
        <ion-segment-button value="intermediate">
          <ion-label>Intermediate</ion-label>
        </ion-segment-button>
        <ion-segment-button value="loyal">
          <ion-label>Loyal</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div class="reward-card-container">
        <ion-card
          v-for="(card, index) in filteredCards"
          :key="index"
          class="reward-card"
        >
          <div class="card-flex">
            <div class="image-container">
              <img :src="card.image" />
            </div>
            <div class="card-text">
              <ion-card-header>
                <ion-card-title>{{ card.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>{{ card.category }}</ion-card-content>
              <div class="points-row">
                <ion-icon :icon="diamondOutline" size="large"></ion-icon>
                <ion-label
                  ><strong>{{ card.cost }} Points</strong></ion-label
                >
              </div>
            </div>
          </div>
        </ion-card>
      </div>
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
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import {
  diamondOutline,
  personCircleOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import { ref, onMounted, defineProps, computed } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const points = 80;
const maxPoints = 160;

onMounted(() => {
  const ctx = document.getElementById("pointsChart") as HTMLCanvasElement;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [points, maxPoints - points],
          backgroundColor: ["#19226d", "#E0E0E0"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });
});

const selectedCategory = ref("all");

const filteredCards = computed(() => {
  return cards.filter((card) => {
    if (selectedCategory.value === "beginner") {
      return card.cost <= 50;
    } else if (selectedCategory.value === "intermediate") {
      return card.cost > 50 && card.cost <= 100;
    } else if (selectedCategory.value === "loyal") {
      return card.cost > 100;
    }
    return true;
  });
});


// replace with JSON data from backend API
const cards = [
  {
    image: "https://imgs.search.brave.com/muBrq1pldskvUEEbWyiW5Voqc0HXcozpQitfuP50v5Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcz/NjE5ODk3L3Bob3Rv/L2lza2VuZGVyLWtl/YmFiLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz14UEVIbGYx/bVJJVWhKYjBvN0lY/d1pDTkpSWGp6Y1gz/Zkp4RTYzVjlCRWZr/PQ",
    title: "Iskander Kebab",
    category: "Meat",
    cost: 20,
  },
  {
    image: "https://imgs.search.brave.com/SjIuL5DGY6sjo8UkYFqclHS3066lDWYSyEEEQbZCU1I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5Lzg2LzI4Lzcz/LzM2MF9GXzk4NjI4/NzM2MF9FUGNGNUxK/ZWZDQlp2YnJOTzA4/NExpQ2h6V2llc0Fn/Qi5qcGc",
    title: "Chicken Biryani",
    category: "Chicken",
    cost: 60,
  },
  {
    image: "https://imgs.search.brave.com/KEpixKGULxoT8WhLmP7xU-0LGDO7_toJChzAgMU-4oQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjY5/NTY2OTI0L3Bob3Rv/L2Jha2xhdmEuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTJY/T1dZVnhmZk5fMW5Q/dDRRNkhQRTdWOUVB/SmNTejhOX045a3Fx/cXdyM2s9",
    title: "Baklava",
    category: "Dessert",
    cost: 80,
  },
  {
    image: "https://imgs.search.brave.com/jEIf7JHMGzp1fhdrK2SoZgXiqdri0DzVef6KRZE-G4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vdHRv/bGVuZ2hpLmNvLnVr/L2Nkbi9zaG9wL2Zp/bGVzL3NoYWtzaHVr/YS02XzFfMS5qcGc_/dj0xNzA4MDkwMjgw/JndpZHRoPTEwMDA",
    title: "Shakshouka",
    category: "Breakfast",
    cost: 120,
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

.header-container {
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  gap: 4px; 
}

.header-container ion-icon {
  margin-right: 4px; 
}

.header-container h4 {
  font-weight: bold;
  margin: 0; 
}

.header-container ion-button {
  margin-left: auto; 
}

.progress-circle-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 200px; 
  margin-top: 20px;
}

.rounded-segment {
  --border-radius: 9999px; 
  --indicator-border-radius: 9999px;
  padding: 4px;
  background-color: var(--ion-color-light);
  border-radius: 9999px;
}

ion-segment-button {
  --border-radius: 9999px;
  margin: 2px;
}

.reward-card-container ion-card {
  border-radius: 16px;
}

.reward-card {
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
</style>
