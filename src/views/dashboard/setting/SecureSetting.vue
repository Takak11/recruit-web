<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <List>
      <template v-for="item in list" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.title }}
              <div class="extra" v-if="item.extra" @click="handleModify(item.title)">
                {{ item.extra }}
              </div>
            </template>
            <template #description>
              <div>{{ item.description }}</div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </CollapseContainer>
</template>
<script lang="ts">
  import { List } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';

  import { secureSettingList } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { router } from '/@/router';

  export default defineComponent({
    components: { CollapseContainer, List, ListItem: List.Item, ListItemMeta: List.Item.Meta },
    setup() {
      const userStore = useUserStore();
      const info = userStore.getUserInfo;
      secureSettingList[1].description = info.mobile;
      secureSettingList[2].description = info.username;

      async function handleModify(title: string) {
        if (title === '账户密码') {
          router.push('password');
        } else {
          router.push(self);
        }
      }
      return {
        list: secureSettingList,
        handleModify,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
