<script setup>
    import {ref, onMounted} from 'vue'

    let data = ref([
        {
            team: "Porsche",
            score: "50",
        },
        {
            team: "Ferrari",
            score: "75",
        },
        {
            team: "McLaren",
            score: "25",
        },
        {
            team: "Mercedes",
            score: "0",
        },
        {
            team: "Bmw",
            score: "25",
        }
    ]);

    let socketServer = null;

    onMounted(() => {
        socketServer = new WebSocket("wss://dav5-lab6.onrender.com/primus");

        // listen for data
        socketServer.onmessage = (event) => {
            let newData = JSON.parse(event.data);
            if (newData.action == "scoreUpdate") {
                // Find the team in the data array
                let existingTeam = data.value.find(team => team.team === newData.team);

                // Update the score if the team exists, otherwise add a new entry
                if (existingTeam) {
                    existingTeam.score = parseInt(existingTeam.score, 10) + parseInt(newData.score, 10);
                } else {
                    data.value.push({
                        team: newData.team,
                        score: parseInt(newData.score, 10),
                    });
                }
            }
        };
    });
</script>

<template>
  <h1>Live Score</h1>
  <table>
    <tr>
      <th>Team</th>
      <th>Score</th>
    </tr>
    <tr v-for="item in data" :key="item.team">
      <td>{{ item.team }}</td>
      <td>{{ item.score }}</td>
    </tr>
  </table>
</template>

<style scoped>

</style>