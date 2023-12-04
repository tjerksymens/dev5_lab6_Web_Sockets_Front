<script setup>
    import {ref, reactive, onMounted} from 'vue'

    let teams = reactive(["Porsche", "Ferrari", "McLaren", "Mercedes", "Bmw"]);
    let team = ref("Porsche");
    let score = ref("");
    let socketServer = null;

    onMounted(() => {
        socketServer = new WebSocket("wss://dav5-lab6.onrender.com/primus");
    });

    const updateScore = () => {
        let data ={
            action: "scoreUpdate",
            team: team.value,
            score: score.value,
        };

        socketServer.send(JSON.stringify(data));
    };
</script>

<template>
  <h1>Update Score</h1>
  <label for="selectedTeam">Select Team:</label>
    <select id="selectedTeam" v-model="team">
        <option v-for="team in teams" :key="team">{{team}}</option>
    </select>
    <input type="text" v-model="score">
    <button @click="updateScore">Update Score</button>
</template>

<style scoped>

</style>