import { Input } from 'antd';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { useThrottleFn } from 'ahooks';

export default function Search() {

  const { run: onSearch } = useThrottleFn(e => {
    console.log(e.target.value);
  }, { wait: 800 });

  return (
    <div
      key="SearchOutlined"
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 24
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: 'rgba(0,0,0,0.03)'
        }}
        prefix={
          <SearchOutlined
            style={{
              color: 'rgba(0, 0, 0, 0.15)'
            }}
          />
        }
        placeholder="输入关键字搜索"
        variant="borderless"
        allowClear
        onChange={onSearch}
        onPressEnter={onSearch}
      />
      <PlusCircleFilled
        style={{
          color: 'var(--ant-primary-color)',
          fontSize: 24
        }}
      />
    </div>
  );
}
