using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Maps;
using Xamarin.Forms.Xaml;

namespace MoveMe
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class MapPage : ContentPage
	{
        public MapPage(string cityName)
        {
            InitializeComponent();
            Task.Delay(2000);

            UpdateMap(cityName);
        }

        private async void UpdateMap(string citiName)
        {
            Geocoder geocoder = new Geocoder();
            IEnumerable<Position> approximateLocations = await geocoder.GetPositionsForAddressAsync(citiName + " Romania");
            Position position = approximateLocations.FirstOrDefault();
            MyMap.MoveToRegion(MapSpan.FromCenterAndRadius(new Position(position.Latitude, position.Longitude), Distance.FromKilometers(1)));
        }
    }
}