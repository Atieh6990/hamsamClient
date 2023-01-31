export const CustomValidator = {
  Rules: {
    messages: {
      required: (field) => '' + field + ' وارد نشده است ',
      min: (field, params) => ' طول ' + field + ' باید مینیمم ' + params + ' کاراکتر باشد',
      max: (field, params) => ' طول ' + field + ' باید ماکزیمم ' + params + ' کاراکتر باشد',
      length: (field, params) => ' طول ' + field + ' باید ' + params + ' کاراکتر باشد',
      email: (field) =>  field + ' باید فرمت مناسب داشته باشد ',
        numeric : (field) =>  field + ' باید فرمت مناسب داشته باشد ',

    },
    attributes: {
      email: 'Email'
    }, custom: {
      phone: {
        required: 'teeeeeel'
      },
      name: {
        required: () => 'Your name is empty'
      }
    }
  }
}
