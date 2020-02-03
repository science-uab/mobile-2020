using MoveMe.Model;
using System;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MoveMe
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPage : ContentPage
	{
		public LoginPage ()
		{
			InitializeComponent ();
		}

        private void LoginButton_Clicked(object sender, EventArgs e)
        {
            string emailAddress = email.Text;
            string pass = password.Text;

            using (SQLite.SQLiteConnection conn = new SQLite.SQLiteConnection(App.DB_PATH))
            {
                var user = conn.Table<User>().Where(x => x.email == emailAddress && x.password == pass).FirstOrDefault();

                if (user != null)
                {
                    Navigation.PushAsync(new CompanyListPage());
                }
                else
                {
                    var company = conn.Table<Company>().Where(x => x.email == emailAddress && x.password == pass).FirstOrDefault();
                    if (company != null)
                    {
                        Navigation.PushAsync(new MainPage());
                    }
                    else
                    {
                        DisplayAlert("Sorry Invalid Credentials", "Please try again", "OK");
                        email.Text = "";
                        password.Text = "";
                    }

                }
            }
        }
    }
}