import React, { useRef, useState } from 'react';
import { View, Text, FlatList, ViewToken } from 'react-native';
import { useGetFeed } from '../../hooks/useGetFeed';
import { styles } from './styles';
import { Post } from '../../@types';

const FeedScreen = () => {
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const mediaRefs = useRef<any>([]);
  const { data, isLoading } = useGetFeed({
    limit: 10,
    cursor
  });

  const onViewableItemsChanged = useRef(
    ({ changed }: { changed: ViewToken[] }) => {
      changed.forEach((element: ViewToken) => {
        const cell = mediaRefs.current[element.key];
        if (cell) {
          if (element.isViewable) {
            cell.play();
          } else {
            cell.stop();
          }
        }
      });
    }
  );

  const renderItem = ({ item, index }) => {
    return <View style={{ height: '100%', backgroundColor: 'black' }}></View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data as Post[]}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 0
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item.id}
        decelerationRate='normal'
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default FeedScreen;
