<template>
  <body>
    <div class="menu-icon">
      <router-link to="/">
        <img src="../../assets/img/menu.png" />
      </router-link>
    </div>
    <div class="food">
      <p>Finit8</p>
    </div>
    <div class="search">
      <b-form>
        <input
          style="border-color:white"
          placeholder="Search..."
          type="search"
          v-model="search"
          @change="searchProduct()"
        />
        <!-- </input> -->
        <button
          type="reset"
          style="background:transparent;background:white;border:none"
        >
          <img
            style="width:20px;text-color:white"
            src="../../assets/img/magnifying-glass.png"
          />
        </button>
      </b-form>
    </div>
  </body>
</template>
