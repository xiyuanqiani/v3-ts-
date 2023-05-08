import useLogin from '@/stores/login/login'
function usePermission(permissionId: string) {
  const loginStore = useLogin()
  const { permission } = loginStore
  // !!变为布尔值
  return !!permission.find((item) => item.includes(permissionId))
}

export default usePermission
