using Plugin.Media;
using SQLite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ProiectMobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewRecipePage : ContentPage
    {
        public NewRecipePage()
        {
            InitializeComponent();
            CameraButton.Clicked += CameraButton_Clicked;
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            reteta reteta = new reteta()
            {
                NumeReteta = numeReteta.Text,
                Ingrediente = ingredienteReteta.Text
            };

            using (SQLite.SQLiteConnection conn = new SQLite.SQLiteConnection(App.DB_PATH))
            {
                

                if (numeReteta.Text == null && ingredienteReteta.Text == null)
                {
                    DisplayAlert("Eroare", "Campurile trebuie completate", "OK");

                }
               
                else
                {
                    conn.CreateTable<reteta>();
                    conn.Insert(reteta);
                    DisplayAlert("Succes", "Reteta a fost introdusa in lista", "OK");
                }
              


            }

        }

        private void Button_Clicked_1(object sender, EventArgs e)
        {
            using (SQLite.SQLiteConnection conn = new SQLite.SQLiteConnection(App.DB_PATH))
            {
                reteta reteta = new reteta();
                conn.DropTable<reteta>();
              
                DisplayAlert("Succes", "Lista de cumparaturi este stearsa", "OK");

            }
        }

      
        private async void CameraButton_Clicked(object sender, EventArgs e)
        {
            var photo = await Plugin.Media.CrossMedia.Current.TakePhotoAsync(new Plugin.Media.Abstractions.StoreCameraMediaOptions() { });

            if (photo != null)
                PhotoImage.Source = ImageSource.FromStream(() => { return photo.GetStream(); });
        }

       
    }
}