using MoveMe.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MoveMe
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class CompanyListPage : ContentPage
	{
        public ObservableCollection<Company> companies;

        public CompanyListPage ()
		{
			InitializeComponent ();
            companyListView.ItemsSource = GetCompanies();
           
        }

        private ObservableCollection<Company> GetCompanies()
        {
            
            using (SQLite.SQLiteConnection conn = new SQLite.SQLiteConnection(App.DB_PATH))
            {
                List<Company> list = conn.Table<Company>().Select(row => row).ToList();
                companies = new ObservableCollection<Company>(list);
            }

            return companies;
        }

        private void SearchBar_TextChanged(object sender, TextChangedEventArgs e)
        {
            var container = companies;
            companyListView.BeginRefresh();

            if (string.IsNullOrWhiteSpace(e.NewTextValue))
            {
                companyListView.ItemsSource = container;
            }
            else
            {
                companyListView.ItemsSource = container.Where(x => x.city.ToLower().Contains(e.NewTextValue.ToLower()));
            }

            companyListView.EndRefresh();
        }

        private void ViewCell_Tapped(object sender, EventArgs e)
        {
            companyListView.ItemTapped += OnTapEventAsync;
        }

        async void OnTapEventAsync(object sender, ItemTappedEventArgs e)
        {
            if (e.Item == null) return;
            var selectedItem = e.Item as Company;
            string sss = selectedItem.city;
            await Navigation.PushAsync(new MapPage(selectedItem.city));

        }
    }
}