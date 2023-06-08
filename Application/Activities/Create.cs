using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext context;
            public Handler(DataContext context)
            {
            this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Add new Activity into memory
               context.Activities.Add(request.Activity);

               // save the new Activity permanently
               await context.SaveChangesAsync();

               // return nothing
               return Unit.Value;
            }
        }
    }
}