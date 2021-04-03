<template>
  <div id="main">
    <ul>
      <li v-for="(favorite, index) in Favorites" :key="index + '' + favorite.path">
        <img :src="favorite.icon" />
      </li>
    </ul>
    <div style="min-height: 20%; min-width: 98%; position: absolute; background-color:grey;"
    @drop.prevent="dropped"
    @dragover.prevent> + </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Favorite from "@/models/Favorite";

@Component
export default class Home extends Vue {
  public Favorites: Favorite[] = [];
  
  public dropped(e: DragEvent): void {
    e.preventDefault();
    var files = [];
    if(e.dataTransfer?.files){
      for (const i of e.dataTransfer.files) {
        files.push(new Favorite(i));
      }
      this.getIcon(files);
    }
    e.dataTransfer?.clearData();
  }

  public getIcon(files: Favorite[]): void {
    window.ipcRenderer.send("drop", files);
    window.ipcRenderer.receive("file", (files?: Favorite[]) => {
      this.Favorites = this.Favorites.concat(files!);
    });
  }

  public test() {
    alert("Motherfucker");
  }
}
</script>
