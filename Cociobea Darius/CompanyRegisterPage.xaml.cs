using MoveMe.Model;
using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MoveMe
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class CompanyRegisterPage : ContentPage
	{
		public CompanyRegisterPage ()
		{
			InitializeComponent ();
		}

        private void clearFields()
        {
            companyName.Text = string.Empty;
            emailAddress.Text = string.Empty;
            companyAddress.Text = string.Empty;
            city.Text = string.Empty;
            feePerKm.Text = string.Empty;
            password.Text = string.Empty;
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            Company company = new Company()
            {
                companyName = companyName.Text,
                email = emailAddress.Text,
                address = companyAddress.Text,
                city = city.Text,
                feePerKm = double.Parse(feePerKm.Text, System.Globalization.CultureInfo.InvariantCulture),
                password = password.Text
            };

            using (SQLite.SQLiteConnection conn = new SQLite.SQLiteConnection(App.DB_PATH))
            {
                conn.CreateTable<Company>();
                var numberOfRows = conn.Insert(company);
                if (numberOfRows > 0)
                {
                    Navigation.PushAsync(new LoginPage());
                }
                else
                {
                    DisplayAlert("Failure", "Company not created", "Sorry");
                    clearFields();
                }
            }

        }
    }
}