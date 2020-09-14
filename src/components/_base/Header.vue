<template>
  <div>
    <b-container fluid class="home">
      <b-row class="header">
        <b-col md="8">
          <div class="menu-icon">
            <b-button
              style="background-color:transparent;border:none"
              v-b-toggle.sidebar-1
              ><img src="../../assets/img/menu.png"
            /></b-button>
            <b-sidebar
              class="aside text-center"
              id="sidebar-1"
              title="Hello..."
              shadow
              bg-variant="light"
            >
              <router-link to="/admin">
                <h3 style="cursor:pointer;color:black">
                  <img style="height:30px" src="../../assets/img/admin.png" />
                  Admin
                </h3>
              </router-link>
              <router-link to="/setting">
                <h3 style="cursor:pointer;color:black">
                  <img style="height:30px" src="../../assets/img/list.png" />
                  Setting
                </h3>
              </router-link>
              <h3 style="cursor:pointer" @click="handleLogout">
                <img style="height:30px" src="../../assets/img/logout.png" />
                Logout
              </h3>
            </b-sidebar>
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
                v-model="find"
                @change="searchProduct"
              />
              <button
                type="reset"
                style="background:transparent;background:white;border:none"
              >
                <img
                  style="text-color:white"
                  src="../../assets/img/magnifying-glass.png"
                />
              </button>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style src="../../assets/css/style.css"></style>
