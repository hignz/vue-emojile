import http from '../utils/http';
import * as constants from './constants';

export default {
  fetchEmotes({ commit }, query) {
    commit(constants.SET_LOADING, true);

    return http
      .get(query ? `/api/ffz/emoticons?q=${query}` : '/api/ffz/emoticons/')
      .then(res => {
        commit(constants.SET_LOADING, false);

        return res.data;
      });
  },
  fetchEmote({ commit }, id) {
    commit(constants.SET_LOADING, true);

    return http.get(`/api/ffz/emote/${id}`).then(res => {
      commit(constants.SET_LOADING, false);

      return res.data;
    });
  },
  fetchEmotesByCollection({ commit }, id) {
    commit(constants.SET_LOADING, true);

    return http.get(`/api/emojis/collection/${id}`).then(res => {
      commit(constants.SET_LOADING, false);

      return res.data;
    });
  },
  fetchMyCollections() {
    // commit(constants.SET_LOADING, true);

    return http.get('/api/collections/user').then(res => {
      // commit(constants.SET_LOADING, false);

      return res.data;
    });
  },
  // fetchMyCollections(_, userId) {
  //   // commit(constants.SET_LOADING, true);

  //   return http
  //     .get(userId ? `/api/collections?userId=${userId}` : '/api/collections')
  //     .then(res => {
  //       // commit(constants.SET_LOADING, false);

  //       return res.data;
  //     });
  // },
  fetchCollection({ commit }, id) {
    commit(constants.SET_LOADING, true);

    return http.get(`/api/collections/${id}`).then(res => {
      commit(constants.SET_LOADING, false);

      return res.data;
    });
  },
  fetchCollections({ commit }) {
    commit(constants.SET_LOADING, true);

    return http.get('/api/collections').then(res => {
      commit(constants.SET_LOADING, false);

      return res.data;
    });
  },
  postCollection(_, data) {
    return http.post('/api/collections', { Name: data.name }).then(res => {
      return res.data;
    });
  },
  postEmote(_, data) {
    return http
      .post('/api/emojis', {
        Name: data.name,
        URL: data.url,
        CollectionId: data.collectionId,
        Owner: data.owner,
        OwnerId: data.ownerId,
        UsageCount: data.usageCount
      })
      .then(res => {
        return res.data;
      });
  },
  doRegister(_, data) {
    return http.post('/api/account/register', data).then(res => {
      return res.data;
    });
  },
  doDeleteEmoji(_, id) {
    return http.delete(`/api/Emojis/${id}`).then(res => {
      return res.data;
    });
  },
  doDeleteCollection(_, id) {
    return http.delete(`/api/Collections/${id}`).then(res => {
      return res.data;
    });
  },
  doLogin({ commit }, data) {
    return http
      .post(
        '/token',
        `userName=${data.email}&password=${data.password}&grant_type=password`
      )
      .then(res => {
        commit(constants.SET_ACCESS_TOKEN, res.data.access_token);
        commit(constants.SET_USER, res.data);

        return res.data;
      });
  },
  doLogout({ commit }) {
    return http
      .post('/api/account/logout')
      .then(res => {
        commit(constants.REMOVE_ACCESS_TOKEN);
        return res.data;
      })
      .catch(err => console.log(err));
  }
};
