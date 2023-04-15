import React from 'react';
import cls from 'clsx';
import { useRandomId } from '@/hooks/useRandomId';
import { IListItemProps } from './List.types';
import styles from './list.module.css';

const Item: React.FC<IListItemProps> = ({
  className,
  draggable = false,
  id,
  children,
  dragStartHandler,
  dragOverHandler,
  dragEnterHandler,
  dragEndHandler,
  dropHandler
}) => {
  id = useRandomId(id);
  return (
    <li
      className={cls(styles.item, className)}
      draggable={draggable}
      data-id={id}
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDragEnter={dragEnterHandler}
      onDragEnd={dragEndHandler}
      onDrop={dropHandler}
    >
      {children}
    </li>
  );
};

export default Item;
