using System;
using System.Collections.Generic;

namespace concurrent_parallel
{
    class PercentEventArgs: EventArgs
    {
        public byte Percent {get; private set;}

        public PercentEventArgs(byte percent)
        {
            Percent = percent;
        }
    }

    interface IWorker
    {
        Dictionary<string, int> DoWork(string[] data);

        event EventHandler<PercentEventArgs> NotifyPercent;
    }
}
