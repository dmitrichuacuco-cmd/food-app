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

      <ion-segment value="all" color="primary" class="rounded-segment">
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
          v-for="(card, index) in cards"
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
import { ref, onMounted, defineProps } from "vue";
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

// replace with JSON data from backend API
const cards = [
  {
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "Card 1",
    category: "Meat",
    cost: 20,
  },
  {
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "Card 2",
    category: "Chicken",
    cost: 25,
  },
  {
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "Card 3",
    category: "Dessert",
    cost: 60,
  },
  {
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    title: "Card 4",
    category: "Breakfast",
    cost: 100,
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
