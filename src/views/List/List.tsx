import { useState, useCallback } from 'react';
import { List } from '@/components';
import styles from './list.module.css';

interface Item {
  label: string;
  key: string;
}

const ListView = () => {
  const [data, setData] = useState<Item[]>([
    { label: 'Australia', key: 'AU' },
    { label: 'Brazil', key: 'BR' },
    { label: 'China', key: 'CN' },
    { label: 'Egypt', key: 'EG' },
    { label: 'France', key: 'FR' },
    { label: 'Germany', key: 'DE' },
    { label: 'India', key: 'IN' },
    { label: 'Japan', key: 'JP' },
    { label: 'Spain', key: 'ES' },
    { label: 'United States', key: 'US' }
  ]);

  const renderItem = useCallback((item: Item) => {
    return <div className={styles.listItem}>{item.label}</div>;
  }, []);
  return (
    <div className={styles.list}>
      <List
        dataSource={data}
        setList={setData}
        draggable
        renderItem={renderItem}
        className={styles.listInner}
      />
    </div>
  );
};

export default ListView;
