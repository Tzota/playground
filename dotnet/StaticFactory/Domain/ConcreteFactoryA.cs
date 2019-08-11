using Infrastructure;

namespace Domain
{
    class ConcreteFactoryA : AbstractFactory
    {
        public ConcreteFactoryA()
        {

        }

        protected override AbstractWidget CreateWidget()
        {
            return null;
        }
    }
}
