import Swal, { type SweetAlertResult } from 'sweetalert2';

type AlertOptions = {
  titleText?: string,
  html?: string,
  icon?: 'success' | 'error'
}

export const showAlert = async ( options: AlertOptions): Promise<SweetAlertResult> => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton:false,
    customClass: {
      popup: 'text-xs', // Add your custom class name here
    },
  })
  return Toast.fire({...options});
};

export default defineNuxtPlugin(() => {
  inject('showAlert', showAlert);
});
