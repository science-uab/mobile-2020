using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace aplicatie
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {
        static string bomba = new Random().Next(1, 6).ToString();
        static int scor = 0;

        public MainPage()
        {
            InitializeComponent();
        }

        async void ButtonClicked(object sender, EventArgs e)
        {
            Button buton = sender as Button;

            //Sfarsit Joc
            if (buton.Text == bomba)
            {
                await DisplayAlert("Bomba a explodat", "SFARSIT JOC", "Mai incearca");
                bomba = new Random().Next(1, 6).ToString();
                scor = 0;
            }
            else
            {
                scor += 1;
                await DisplayAlert("Nu a fost bomba!", "Scor: " + scor, "Continua");
                bomba = new Random().Next(1, 6).ToString();
            }
        }
    }
}
