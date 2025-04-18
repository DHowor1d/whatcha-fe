import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { format } from 'date-fns';
// import { ko } from 'date-fns/locale';
import { User, getAllUsers } from '../../api/member';

const columns: GridColDef[] = [
  { field: 'name', headerName: '이름', width: 80 },
  { field: 'email', headerName: '이메일', width: 200 },
  { field: 'phone', headerName: '연락처', width: 120 },
  { field: 'address', headerName: '주소', width: 150 },
  { field: 'ageGroup', headerName: '연령대', width: 80 },
  { field: 'gender', headerName: '성별', width: 80 },
  { field: 'preferenceModel1', headerName: '선호 모델 1', width: 110 },
  { field: 'preferenceModel2', headerName: '선호 모델 2', width: 110 },
  { field: 'preferenceModel3', headerName: '선호 모델 3', width: 108 },

];

function UserTable() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('에러 상세:', err);  // 상세 에러 로깅
        setError('회원 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  
  return (
    <div className="w-full">
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

export default UserTable;