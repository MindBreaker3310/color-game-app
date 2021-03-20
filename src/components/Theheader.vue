<template>
	<header>
		<nav>
			<ul>
				<li>
					<router-link to="/">Color Game</router-link>
				</li>
				<li>
					<router-link to="/leaderboard">英雄榜</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
	height: 2rem;
	background-color: white;
	margin: 0 10%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	justify-self: center;
	align-items: center;
}

li {
	margin: 0 1rem;
}

a {
	text-decoration: none;
	color: #333;
	font-weight: bold;
	border-bottom: 2px solid transparent;
	padding-bottom: 0.25rem;
}

a:hover,
a:active,
a.router-link-active {
	color: #45006d;
	border-color: #45006d;
}


</style>