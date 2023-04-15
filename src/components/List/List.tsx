import React, { useEffect, useRef, useCallback } from 'react';
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
  const containerRef = useRef<HTMLUListElement>(null);
  const prevRects = useRef<Record<string, DOMRect>>({});
  const recordRect = useCallback(() => {
    if (containerRef.current) {
      Array.from(containerRef.current.children).forEach(async node => {
        const dom = node as HTMLElement;
        const key = dom.dataset.id as string;
        const rect = dom.getBoundingClientRect();
        prevRects.current[key] = rect;
      });
    }
  }, []);

  const {
    sortedData,
    dragStartHandler,
    dragOverHandler,
    dragEnterHandler,
    dragEndHandler,
    dropHandler
  } = useDraggable({
    dataSource,
    updateData: setList,
    onDragStart: recordRect
  });

  useEffect(() => {
    if (containerRef.current) {
      Array.from(containerRef.current.children).forEach(async node => {
        const dom = node as HTMLElement;
        const key = dom.dataset.id as string;
        const prevRect = prevRects.current[key];
        const rect = dom.getBoundingClientRect();
        if (prevRect) {
          const dy = prevRect.y - rect.y;
          const dx = prevRect.x - rect.x;
          dom.style.pointerEvents = 'none';
          dom.animate(
            [
              {
                transform: `translate(${dx}px, ${dy}px)`
              },
              { transform: 'translate(0, 0)' }
            ],
            {
              duration: 300,
              easing: 'linear'
            }
          );
          await Promise.allSettled(
            node.getAnimations().map(animation => animation.finished)
          );
          dom.style.pointerEvents = '';
        }
        prevRects.current[key] = rect;
      });
    }
  }, [sortedData]);

  return (
    <div className={styles.list}>
      <ul className={cls(styles.listInner, className)} ref={containerRef}>
        {children
          ? children
          : sortedData?.map((item, index) => {
              if (renderItem) {
                return (
                  <Item
                    key={item.key ?? index}
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
                    key={item.key ?? index}
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
