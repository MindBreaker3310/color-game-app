<template>
	<base-dialog v-if="gameFinish" title="遊戲結束😉">
		<template #default>
			<h3>你的分數: {{ score }}</h3>
		</template>
		<template #actions>
			<input type="text" placeholder="暱稱" ref="inputName" />
			<button class="act_btn" @click="submitDialog">前進英雄榜</button>
			<button class="act_btn" @click="closeDialog">回家練練</button>
		</template>
	</base-dialog>

	<div
		class="boxesContainer"
		:style="{
			'grid-template-columns': 'repeat(' + gameLevel + ', 1fr)',
			'grid-template-rows': 'repeat(' + gameLevel + ', 1fr)',
		}"
	>
		<div
			v-for="box in boxes"
			:key="box.id"
			:style="{ 'background-color': box.color }"
			@click="clickBox"
			class="box"
			:class="{ showUp: time <= 0 && gameOver && box.color === changedColor }"
		>
			<!-- {{ box.id }} -->
		</div>
	</div>
	<div class="controller">
		<p :class="{ 'glitch-effect': !gameOver }" :data-text="'時間: ' + time">
			時間: {{ timeLeft }}
		</p>
		<p>分數: {{ score }}</p>
		<button class="ctrl_btn" @click="startGame" v-if="gameOver">
			開始遊戲
		</button>
		<button class="ctrl_btn" @click="endGame" v-else>結束</button>
	</div>
</template>

<script>
export default {
    inject:['addDataToLeaders'],
	data() {
		return {
			mainColor: null,
			changedColor: null,
			boxes: [],
			gameLevel: 2,
			gameDifficulty: 1,
			score: 0,
			gameOver: true,
			ansBoxId: 0,
			timer: null,
			time: 30,
			gameFinish: false,
		};
	},
	methods: {
		clickBox($event) {
			//點擊BOX
			// console.log($event.target.style.backgroundColor);
			// console.log(this.changedColor);
			if (this.gameOver) {
				return;
			}
			if ($event.target.style.backgroundColor === this.changedColor) {
				this.score++;
			} else {
				this.time--;
				return;
			}
			if (
				(this.gameLevel <= 5 || this.gameDifficulty % 10 == 0) &&
				this.gameLevel < 8
			) {
				this.gameLevel++;
			}
			if (this.gameDifficulty < 30) {
				this.gameDifficulty++;
			}
			this.changeBoxColor();
			this.generateBoxes();
		},
		generateBoxes() {
			//設定整個遊戲的boxes
			const boxesCount = this.gameLevel * this.gameLevel;
			const ranNum = Math.floor(Math.random() * boxesCount);
			this.ansBoxId = ranNum;
			const newBoxes = [];
			for (let i = 0; i < boxesCount; i++) {
				newBoxes.push({ id: i, color: this.mainColor });
			}
			newBoxes[ranNum].color = this.changedColor;
			this.boxes = newBoxes;
		},
		changeBoxColor() {
			//改變主要顏色與變色
			const genColor = function () {
				return Math.floor(Math.random() * 256);
			};
			const difficulty = this.gameDifficulty;
			const changeRGB = function (value) {
				let changeRange = 80 - difficulty * 2;
				let change =
					Math.floor(Math.random() * changeRange) - changeRange / 2;
				if (Math.abs(change) <= changeRange || Math.abs(change) <= 3) {
					change = change * 2;
				}
				if (value + change > 255) {
					return value - change;
				}
				if (value + change < 0) {
					return value - change;
				}
				return value + change;
			};
			const R = genColor();
			const G = genColor();
			const B = genColor();
			// this.mainColor = "rgb(" + R + ", " + G + ", " + B + ")";
			// this.changedColor =
			// 	"rgb(" +
			// 	changeRGB(R) +
			// 	", " +
			// 	changeRGB(G) +
			// 	", " +
			// 	changeRGB(B) +
			// 	")";
            this.mainColor = `rgb(${R}, ${G}, ${B})`;
			this.changedColor = `rgb(${changeRGB(R)}, ${changeRGB(G)}, ${changeRGB(B)})`;
		},
		startGame() {
			this.gameOver = false;
			this.gameLevel = 2;
			this.gameDifficulty = 1;
			this.score = 0;
			this.time = 30;
			this.gameFinish = false;
			clearInterval(this.timer);
			this.startTimer();
			this.changeBoxColor();
			this.generateBoxes();
		},
		endGame() {
			this.gameOver = true;
			clearInterval(this.timer);
			this.time = 0;
		},
		countdown() {
			//倒數計時
			this.time--;
			if (this.time < 0) {
				this.endGame();
				this.gameFinish = true;
				// alert("你的分數: " + this.score);
			}
		},
		startTimer() {
			this.timer = setInterval(this.countdown, 1000);
		},
		closeDialog() {
			//初始化遊戲
            const enteredName = this.$refs.inputName.value;
            if (enteredName.trim() !== '') {
				this.addDataToLeaders(enteredName, this.score);
                this.$refs.inputName.value = '';
			}
			this.gameFinish = false;
		},
		submitDialog() {
            const enteredName = this.$refs.inputName.value;
			if (enteredName.trim() === '') {
				alert('名子不可以空白!😠')
				return;
			}
            this.addDataToLeaders(enteredName, this.score);
            this.$refs.inputName.value = '';
            this.closeDialog()
            this.$router.push('/leaderboard');
		},
	},
	computed: {
		timeLeft() {
			if (this.time <= 0) {
				return 0;
			} else {
				return this.time;
			}
		},
	},
	mounted() {
		this.changeBoxColor();
		this.generateBoxes();
	},
};
</script>

<style scoped>
.boxesContainer {
	display: grid;

	gap: 3px;
	justify-content: center;
	align-content: center;
	height: 65vh;
	width: 65vh;

	border-radius: 12px;
	box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
		rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
	padding: 1rem;
	margin: 2rem auto;
}

.box {
	border-radius: 12px;
}

.controller {
	display: flex;
	justify-content: space-around;
	margin-bottom: 1rem;
}
.act_btn,
.ctrl_btn {
	font: inherit;
	border: none;
	background-color: #ad6b38;
	border-radius: 12px;
	color: black;
	padding: 1rem 2rem;
	cursor: pointer;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
	margin-left: 1rem;
}
input {
	text-align: center;
	padding: 1rem 2rem;
	flex-grow: 1;
	border: none;
	border-radius: 12px;
	font: inherit;
	outline: none;
}

.ctrl_btn {
	animation: bounce 0.7s 3 linear alternate-reverse;
	margin: 0;
}

.ctrl_btn:focus {
	outline: none;
}

.ctrl_btn:hover,
.ctrl_btn:active {
	box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.26);
	/* animation: bounce 0.7s infinite linear alternate-reverse */
}

a:visited {
	color: purple;
	animation: none;
}

.showUp {
	animation: bounce 0.7s infinite linear alternate-reverse;
}

@media only screen and (max-width: 800px) {
	.boxesContainer {
		height: 95vw;
		width: 95vw;
		margin: 1rem auto;
	}

	.controller {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-bottom: 1rem;
	}

	.act_btn {
		margin-top: 1rem;
		margin-left: 0;
	}
}
</style>