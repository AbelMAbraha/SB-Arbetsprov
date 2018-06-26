using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SBArbetsprov.Startup))]
namespace SBArbetsprov
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
