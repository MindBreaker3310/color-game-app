<template>
	<ul>
        <li class="leader_item">
            <h2 class="item_header">
                🙋‍♂️
            </h2>
            <h2 class="item_header">
                🏆
            </h2>
            <h2 class="item_header">
                🕗
            </h2>
        </li>
        <p v-if="isLoading">Loading...</p>
		<li v-else class="leader_item" v-for="leader in leaders" :key="leader.id">
			<p class="item_name">
				{{ leader.name }}
			</p>
			<p class="item_score">
				{{ leader.score }}
			</p>
			<p class="item_id">
				{{ leader.id }}
			</p>
		</li>
	</ul>
</template>

<script>
export default {
	props: ["leaders", 'isLoading'],
	inject: ["loadLeadersData"],
	mounted() {
		this.loadLeadersData();
	},
};
</script>

<style scoped>


ul{
    margin: 1rem;
    padding: 0;
}
.item_header{
    flex: 1 0 33%;
}
.leader_item{
    display: flex;
    align-items: flex-end;
}
.item_name{
    flex: 1 1 33%;
}
.item_score{
    flex: 1 0 33%;
}
.item_id{
    flex: 1 0 33%;
}

.leader_item:nth-child(2) .item_name::before{
    content: "🥇"
}
.leader_item:nth-child(3) .item_name::before{
    content: "🥈"
}
.leader_item:nth-child(4) .item_name::before{
    content: "🥉"
}



</style>