<template>
  <div>
    <el-container>
      <el-header class="nav-style">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="20">
            <h1 class="title">{{ title }}</h1>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" @click="dialogVisible = true" class="add-button">
              <el-icon :size="25">
                <Plus />
              </el-icon>
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-scrollbar max-height="calc(100vh - 150px)">
          <div class="feeds">
            <div class="feeds-container" v-for="(feed, index) in feeds" :key="index">
              <div class="avatar-container">
                <img :src="avatarUrl" class="feed-avatar" />
              </div>
              <div class="feed-container">
                <pre>{{ feed.message }}</pre>
                <div class="feed-time">
                  <el-text size="small">{{ feed.time }}</el-text>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
      <el-footer class="footer-style">
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="24">
            <el-text size="small">© 2024 FeedsBlog</el-text>
          </el-col>
        </el-row>
      </el-footer>

      <el-dialog v-model="dialogVisible" title="New" max-width="80%">
        <el-form :model="form" @submit.prevent>
          <el-input type="textarea" v-model="newFeed.message" placeholder="How's your mood?" autocomplete="off" />
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addFeed">
              Post
            </el-button>
          </div>
        </template>
      </el-dialog>

    </el-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios'; // 引入axios库
import feedsData from '../data/feeds.json';
import config from '../main.config.json'

const title = ref(config.Title);
const avatarUrl = ref(config.AvatarUrl);

const dialogVisible = ref(false);

const newFeed = ref({
  message: '',
  time: '',
});
const feeds = ref([]);

const addFeed = async () => {
  if (newFeed.value.message) {
    newFeed.value.time = new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    feeds.value.unshift({ ...newFeed.value });
    await axios.post('http://localhost:3000/feeds', newFeed.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    resetNewFeed();
  }
};

const resetNewFeed = () => {
  newFeed.value.message = '';
  newFeed.value.time = '';
  dialogVisible.value = false;
};

onMounted(() => {
  feeds.value = feedsData;
});
</script>



<style scoped>
.app {
  display: flex;
  flex-direction: column;
}

.nav-style {
  padding: 20px;
  color: #000000;
}

.title {
  margin: 0;
}

.text-right {
  text-align: right;
}

.feeds {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feeds-container {
    display: flex;
    align-items: flex-start;
    width: 80%;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 10px;
  }

.feed-container {
    position: relative; /* Add this line */
    width: 300px;
    height: auto;
    flex-grow: 1;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid gray;
    border-radius: 20px;
  }

.avatar-container {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  flex-shrink: 0;
}

.feed-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.feed-time {
    position: absolute;
    right: 10px;
    bottom: 1px;
  }

.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  color: #000000;
  text-align: center;
}

</style>