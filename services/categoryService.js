  export default {
    /**
   * @param  {Object} activeCat - current active category
   * @param  {Object} store - Vue.js store object
   * @returns [Array] actualCategoriesList - current categories list to output
   */
  actualCategoriesList(activeCat, store) {
    let actualCategoriesList;
    
    if (activeCat && activeCat.subCategories.length == 0) {
      actualCategoriesList = activeCat.subCategories.map(id =>
        {
          console.warn('id12321 ', id);
          return store.getters.getCategoryById(id);
        }
      );
    } else if (activeCat 
      && activeCat.subCategories 
      && activeCat.subCategories.length > 0) {
      actualCategoriesList = activeCat.subCategories.map(id => {

        console.warn('4444444124 ', id);
        return store.getters.getCategoryById(id);
      }
      );
    } else {
      actualCategoriesList = store.state.categories
        .filter(cat => !cat.parentCategory);
    }
    // TODO: какая-то ошибка с категориями точно поломанны
    console.log('actualCategoriesList', actualCategoriesList);
    return store.state.categories;
  },
}