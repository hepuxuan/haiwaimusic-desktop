import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Mainnav';
import BottomNav from '../components/BottomNav';
import HotSongList from './components/HotSongList';
import AudioPlayback from '../components/AudioPlayback';
import SongListShell from './components/SongListShell';
import styles from './scss/index.scss';

@inject('store') @observer
export default class Index extends React.Component {
  state = {
    selectedhotSongsTab: 'mainland',
    selectedtopSongsTab: 'mainland',
  }

  componentDidMount() {
    this.props.store.fetchNewSongList('mainland');
    this.props.store.fetchTopSongList('mainland');
    this.props.store.fetchPlayList();
  }

  handleSelectTab = (e) => {
    const selectedTab = e.target.getAttribute('data-value');
    const type = e.target.getAttribute('data-type');
    this.setState({
      [`selected${type}Tab`]: selectedTab,
    });

    if (type === 'hotSongs') {
      this.props.store.fetchNewSongList(selectedTab);
    } else {
      this.props.store.fetchTopSongList(selectedTab);
    }
  }

  renderTabs(type) {
    return (
      <div className={styles.tabs}>
        <div>
          <button
            data-type={type}
            data-value="mainland"
            className={this.state[`selected${type}Tab`] === 'mainland' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >内地
          </button>
        </div>
        <div>
          <button
            data-type={type}
            data-value="hktw"
            className={this.state[`selected${type}Tab`] === 'hktw' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >港台
          </button>
        </div>
        <div>
          <button
            data-type={type}
            data-value="euna"
            className={this.state[`selected${type}Tab`] === 'euna' ? styles.activeTab : null}
            onClick={this.handleSelectTab}
          >欧美
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { playList, newSongsMap, topSongsMap } = this.props.store;
    const hotSongsTabs = this.renderTabs('hotSongs');
    const topSongsTabs = this.renderTabs('topSongs');

    const newSongs = newSongsMap.get(this.state.selectedhotSongsTab);
    const topSongs = topSongsMap.get(this.state.selectedtopSongsTab);

    return (
      <React.Fragment>
        <div className="page-body">
          <Navbar />
          <BottomNav activeLink="home" />
          <div className="main-body with-play-back">
            {
              newSongs.length && topSongs.length ? (
                <React.Fragment>
                  {
                    playList.length ? <HotSongList songs={playList} title="播放列表" /> : (
                      <div className={styles.emptyList}>
                        <div className={styles.title}>播放列表</div>
                        播放列表空空如也，立刻
                        <Link to="/search">搜索歌曲</Link>
                        或<a href="/auth/google">登陆</a>
                      </div>
                    )
                  }
                  <HotSongList
                    songs={newSongs.slice(0, 15)}
                    title="新歌榜单"
                    tabs={hotSongsTabs}
                  />
                  <HotSongList
                    songs={topSongs.slice(0, 15)}
                    title="巅峰榜单"
                    tabs={topSongsTabs}
                  />
                  <AudioPlayback />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <SongListShell />
                  <SongListShell />
                  <SongListShell />
                </React.Fragment>
              )
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
