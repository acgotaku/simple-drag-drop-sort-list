import React from 'react';
import cls from 'clsx';
import { noop } from '@/utils/misc';
import { useDraggable } from '@/hooks/useDraggable';
import Item from './Item';
import { IListProps } from './List.types';
import styles from './list.module.css';

const List: React.FC<IListProps> = ({
  dataSource = [],
  children,
  renderItem,
  draggable = false,
  setList = noop,
  className = '',
  itemClassName = ''
}) => {
  const {
    sortedData,
    dragStartHandler,
    dragOverHandler,
    dragEnterHandler,
    dragEndHandler,
    dropHandler
  } = useDraggable({
    dataSource,
    updateData: setList
  });

  return (
    <div className={styles.list}>
      <ul className={cls(styles.listInner, className)}>
        {children
          ? children
          : sortedData?.map((item, index) => {
              if (renderItem) {
                return (
                  <Item
                    key={index}
                    className={itemClassName}
                    draggable={draggable}
                    dragStartHandler={event => dragStartHandler(event, index)}
                    dragEnterHandler={() => dragEnterHandler(index)}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dropHandler={dropHandler}
                  >
                    {renderItem(item, index)}
                  </Item>
                );
              } else {
                return (
                  <Item
                    key={index}
                    className={itemClassName}
                    draggable={draggable}
                    dragStartHandler={event => dragStartHandler(event, index)}
                    dragEnterHandler={() => dragEnterHandler(index)}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dropHandler={dropHandler}
                  >
                    {item.toString()}
                  </Item>
                );
              }
            })}
      </ul>
    </div>
  );
};

export default List;
