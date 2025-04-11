<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-card class="ion-no-margin ion-padding-top">
            <ion-card-content>
              <ion-grid>
                <ion-row class="ion-align-items-center">
                  <ion-col size="2" class="ion-text-center">
                    <ion-avatar style="width: 48px; height: 48px; margin: 0 auto;">
                      <img src="/images/favicon.png" alt="Profile" />
                    </ion-avatar>
                  </ion-col>

                  <ion-col size="10" class="ion-padding-start" @click="goToPoints">
                    <ion-item lines="none" button detail>
                      <ion-icon
                        :icon="diamondOutline"
                        style="padding-left: 8px; padding-right: 8px"
                      ></ion-icon>
                      <ion-label>
                        <strong>{{ user.points }} Points</strong>
                      </ion-label>
                    </ion-item>
                  </ion-col>
                </ion-row>

                <ion-row>
                  <ion-col size="12">
                    <ion-text class="ion-margin-top">
                      <h2 style="font-weight: bold; color: white">
                        {{ user.firstName }} {{ user.lastName }}
                      </h2>
                      <p color="medium">
                        {{ user.contactNumber }}
                      </p>
                    </ion-text>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>

          <ion-list id="inbox-list">
            <ion-menu-toggle
              :auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <ion-item
                @click="selectedIndex = i"
                router-direction="root"
                :router-link="p.url"
                lines="none"
                :detail="false"
                class="hydrated"
                :class="{ selected: selectedIndex === i }"
              >
                <ion-icon
                  aria-hidden="true"
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="labels-list">
            <ion-list-header>Labels</ion-list-header>
            <ion-item
              v-for="(sideMenuOption, index) in sideMenuOptions"
              :key="index"
              lines="none"
            >
              <ion-icon
                aria-hidden="true"
                slot="start"
                :ios="sideMenuOption.ios"
                :md="sideMenuOption.md"
              ></ion-icon>
              <ion-label>{{ sideMenuOption.label }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonText,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from "@ionic/vue";
import { ref } from "vue";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  homeOutline,
  homeSharp,
  cartOutline,
  cartSharp,
  notificationsOutline,
  notificationsSharp,
  locationOutline,
  locationSharp,
  helpCircleOutline,
  helpCircleSharp,
  diamondOutline,
} from "ionicons/icons";

import { useRouter } from "vue-router";

const router = useRouter();
const goToPoints = () => {
  router.push("/points");
};

const selectedIndex = ref(0);
const appPages = [
  {
    title: "Home",
    url: "/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Order Now!",
    url: "/order",
    iosIcon: cartOutline,
    mdIcon: cartSharp,
  },
  {
    title: "Notifications",
    url: "/notifications",
    iosIcon: notificationsOutline,
    mdIcon: notificationsSharp,
  },
  {
    title: "Store Locator",
    url: "/store-locator",
    iosIcon: locationOutline,
    mdIcon: locationSharp,
  },
  {
    title: "FAQ's",
    url: "/faq",
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp,
  },
];
const sideMenuOptions = [
  { label: "My Orders", ios: cartOutline, md: cartSharp },
  { label: "My Account", ios: archiveOutline, md: archiveSharp },
  { label: "My Favorites", ios: heartOutline, md: heartSharp },
  { label: "Order Tracker", ios: bookmarkOutline, md: bookmarkSharp },
  { label: "Order History", ios: mailOutline, md: mailSharp },
];

const user = {
  firstName: "Sung",
  lastName: "Jin-Woo",
  contactNumber: "+63 912 345 6789",
  points: 120,
  email: "sololeveling@gmail.com",
};

const path = window.location.pathname.split("/")[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.url.includes(path));
}
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-background-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

.user-profile {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.profile-image-container {
  margin-bottom: 0;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  margin-bottom: 8px;
}

.user-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 4px;
}

.user-contact {
  font-size: 14px;
  color: var(--ion-color-medium);
  margin: 0;
}

.points-container {
  display: flex;
  align-items: center;
  margin-top: 6px;
}

.crown-icon {
  margin-right: 6px;
  font-size: 16px;
}

.points-text {
  margin-right: 6px;
  font-weight: 500;
}
</style>
