<template>
<nav>
  <div>高雄捷運查詢</div>
</nav>
  <div>
    <router-link to="/"></router-link> 
  </div>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&display=swap');
*{
  margin: 0;
  padding: 0;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Noto Sans TC', sans-serif;
}

nav {
background-color: rgb(85, 85, 237);
width: 100%;
position:fixed;
top: 0;
font-weight:bold;
color: white;
font-size: 20px;
text-shadow: -1px -1px 0 black,
              1px -1px 0 black,
              -1px 1px 0 black,
              1px 1px 0  black;

}
</style>
