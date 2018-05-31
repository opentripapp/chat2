/**
 * Created by muharizals on 04/10/2017.
 */

export default function ({store,redirect,route}) {
  if(route.name === 'index'){
    if (!store.getters.isAuthenticated) {
      redirect('/login')
    }
  }else if(route.name === 'login' ){
    if (store.getters.isAuthenticated) {
      redirect('/')
    }
  }
}
