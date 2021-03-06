﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MoveMe
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class SignUpPage : ContentPage
	{
		public SignUpPage ()
		{
			InitializeComponent ();
		}

        private void UserRegistration_Clicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new UserRegisterPage());
        }

        private void CompanyRegistration_Clicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new CompanyRegisterPage());
        }
    }
}