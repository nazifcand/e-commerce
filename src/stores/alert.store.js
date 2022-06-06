import { defineStore } from 'pinia'
import { translateField, translateMessage } from '../utils/error'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: []
  }),

  actions: {

    add(payload) {
      // scroll to
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
        left: 0
      });

      this.alerts.push({
        text: payload.text,
        class: payload.class,
        deletable: payload.deletable ?? true
      })
    },

    parseValidErrors(errors) {
      Object.entries(errors).forEach(([field, messages]) => {
        if (!Array.isArray(messages)) {
          this.add({
            text: `<p><strong>${translateField(field)}</strong> - ${translateMessage(messages)} </p>`,
            class: 'warning',
          });
          return;
        }

        messages.forEach((message) => {
          this.add({
            text: `<p><strong>${translateField(field)}</strong> - ${translateMessage(message)} </p>`,
            class: 'warning',
          });
        });
      });
    },

    removeAlert(index) {
      this.alerts.splice(index, 1)
    },

    removeAlerts() {
      this.alerts = this.alerts.filter(item => !item.deletable)
    },

    removeAllAlerts() {
      this.alerts.splice(0)
    }
  }
})